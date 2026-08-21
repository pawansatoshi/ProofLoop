import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

const test = process.env.KANE_TEST ?? '.testmuai/tests/proofboard_release_test.md'
const outDir = '.testmuai/output'
const resultFile = `${outDir}/kane-result.ndjson`
fs.mkdirSync(outDir, { recursive: true })

function runKane() {
  return spawnSync('kane-cli', ['testmd', 'run', test, '--agent', '--headless', '--on-lock-conflict', 'wait', '--retry'], { encoding: 'utf8' })
}

function parseRunEnd(stdout) {
  let runEnd = null
  for (const line of stdout.trim().split('\n').filter(Boolean)) {
    try {
      const event = JSON.parse(line)
      if (event.type === 'run_end') runEnd = event
    } catch {
      // Ignore non-JSON output; --agent should emit NDJSON on stdout.
    }
  }
  return runEnd
}

function writeResult(stdout) {
  fs.writeFileSync(resultFile, stdout ?? '')
  return parseRunEnd(stdout ?? '')
}

const first = runKane()
const firstRun = writeResult(first.stdout ?? '')
process.stderr.write(first.stderr ?? '')

console.log(JSON.stringify({
  type: 'kane_loop',
  phase: 'initial',
  exit_code: first.status,
  status: firstRun?.status ?? 'unknown',
  run_id: firstRun?.run_id ?? null,
  summary: firstRun?.summary ?? '',
  evidence_file: resultFile,
}))

if (first.status === 0) process.exit(0)

console.error(`KANE FAILED. Genuine evidence preserved in ${resultFile}.`)
console.error('Inspect the run_end/evidence, fix the root cause, then rerun the same release test.')

if (process.env.KANE_REPAIR_COMMAND) {
  console.error('Running configured repair command…')
  const repair = spawnSync(process.env.KANE_REPAIR_COMMAND, { shell: true, stdio: 'inherit' })
  if (repair.status !== 0) process.exit(repair.status ?? 2)

  const second = runKane()
  const secondRun = writeResult(second.stdout ?? '')
  process.stderr.write(second.stderr ?? '')
  console.log(JSON.stringify({
    type: 'kane_loop',
    phase: 'regression',
    exit_code: second.status,
    status: secondRun?.status ?? 'unknown',
    run_id: secondRun?.run_id ?? null,
    summary: secondRun?.summary ?? '',
    evidence_file: resultFile,
  }))
  process.exit(second.status ?? 2)
}

process.exit(first.status ?? 2)
