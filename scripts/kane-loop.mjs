import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'

const test = process.env.KANE_TEST ?? '.testmuai/tests/proofboard_release_test.md'
const outDir = '.testmuai/output'
const resultFile = `${outDir}/kane-result.ndjson`
const localUrl = process.env.KANE_LOCAL_URL ?? 'http://127.0.0.1:5173/'
const kaneTimeoutMs = Number(process.env.KANE_TIMEOUT_MS ?? 150000)
fs.mkdirSync(outDir, { recursive: true })

let devProcess = null

async function appIsReady() {
  try {
    const response = await fetch(localUrl, { signal: AbortSignal.timeout(2500) })
    return response.ok
  } catch {
    return false
  }
}

async function ensureLocalApp() {
  if (!test.includes('proofboard_release_test.md')) return
  if (await appIsReady()) return

  devProcess = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'], {
    stdio: 'ignore',
    detached: true,
  })
  devProcess.unref()

  const deadline = Date.now() + 20000
  while (Date.now() < deadline) {
    if (await appIsReady()) return
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  throw new Error(`Local ProofLoop app did not become ready at ${localUrl}`)
}

function cleanup() {
  if (!devProcess?.pid) return
  try { process.kill(-devProcess.pid, 'SIGTERM') } catch {}
  devProcess = null
}

function runKane() {
  const env = { ...process.env }
  const chromeCandidates = ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/opt/google/chrome/chrome']
  const chrome = chromeCandidates.find(path => fs.existsSync(path))
  if (chrome) env.KANE_CLI_CHROME_PATH = env.KANE_CLI_CHROME_PATH ?? chrome

  return spawnSync('kane-cli', [
    'testmd', 'run', test, '--agent', '--headless', '--on-lock-conflict', 'wait', '--retry',
  ], {
    encoding: 'utf8',
    timeout: kaneTimeoutMs,
    env,
  })
}

function parseRunEnd(stdout) {
  let runEnd = null
  for (const line of stdout.trim().split('\n').filter(Boolean)) {
    try {
      const event = JSON.parse(line)
      if (event.type === 'run_end') runEnd = event
    } catch {}
  }
  return runEnd
}

function writeResult(stdout) {
  fs.writeFileSync(resultFile, stdout ?? '')
  return parseRunEnd(stdout ?? '')
}

async function main() {
  try {
    await ensureLocalApp()

    const first = runKane()
    const firstRun = writeResult(first.stdout ?? '')
    process.stderr.write(first.stderr ?? '')

    console.log(JSON.stringify({
      type: 'kane_loop',
      phase: 'initial',
      exit_code: first.status,
      signal: first.signal ?? null,
      timed_out: first.error?.code === 'ETIMEDOUT',
      status: firstRun?.status ?? 'unknown',
      run_id: firstRun?.run_id ?? null,
      summary: firstRun?.summary ?? '',
      evidence_file: resultFile,
    }))

    if (first.status === 0) return 0

    console.error(`KANE FAILED. Genuine evidence preserved in ${resultFile}.`)
    console.error('Inspect the run_end/evidence, fix the root cause, then rerun the same release test.')

    if (process.env.KANE_REPAIR_COMMAND) {
      console.error('Running configured repair command…')
      const repair = spawnSync(process.env.KANE_REPAIR_COMMAND, { shell: true, stdio: 'inherit' })
      if (repair.status !== 0) return repair.status ?? 2

      const second = runKane()
      const secondRun = writeResult(second.stdout ?? '')
      process.stderr.write(second.stderr ?? '')
      console.log(JSON.stringify({
        type: 'kane_loop',
        phase: 'regression',
        exit_code: second.status,
        signal: second.signal ?? null,
        timed_out: second.error?.code === 'ETIMEDOUT',
        status: secondRun?.status ?? 'unknown',
        run_id: secondRun?.run_id ?? null,
        summary: secondRun?.summary ?? '',
        evidence_file: resultFile,
      }))
      return second.status ?? 2
    }

    return first.status ?? 2
  } catch (error) {
    console.error(`KANE LOOP ERROR: ${error instanceof Error ? error.message : String(error)}`)
    return 2
  } finally {
    cleanup()
  }
}

process.on('SIGINT', () => { cleanup(); process.exit(130) })
process.on('SIGTERM', () => { cleanup(); process.exit(143) })
process.exit(await main())
