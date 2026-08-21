import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

const test = process.env.KANE_TEST ?? '.testmuai/tests/proofboard_release_test.md'
const outDir = '.testmuai/output'
const resultFile = `${outDir}/kane-result.ndjson`
fs.mkdirSync(outDir, { recursive: true })

function runKane() {
  return spawnSync('kane-cli', ['testmd', 'run', test, '--agent', '--headless', '--on-lock-conflict', 'wait', '--retry'], { encoding: 'utf8' })
}

const first = runKane()
fs.writeFileSync(resultFile, first.stdout ?? '')
process.stderr.write(first.stderr ?? '')

const lines = (first.stdout ?? '').trim().split('\n').filter(Boolean)
let runEnd = null
for (const line of lines) {
  try {
    const event = JSON.parse(line)
    if (event.type === 'run_end') runEnd = event
  } catch {
    continue
  }
}

if (first.status === 0) {
  console.log(JSON.stringify(runEnd ?? { type: 'run_end', status: 'passed', result_code: 100, summary: 'Kane passed without a parsed run_end event.' }))
  process.exit(0)
}

console.error(`\nKANE FAILED. Result preserved in ${resultFile}`)
console.error('The coding agent must inspect the NDJSON/evidence, fix the root cause, then rerun this command.')

if (process.env.KANE_REPAIR_COMMAND) {
  console.error('Running configured repair command…')
  const repair = spawnSync(process.env.KANE_REPAIR_COMMAND, { shell: true, stdio: 'inherit' })
  if (repair.status !== 0) process.exit(repair.status ?? 2)
  const second = runKane()
  fs.writeFileSync(resultFile, second.stdout ?? '')
  process.stderr.write(second.stderr ?? '')
  console.log((second.stdout ?? '').trim().split('\n').filter(Boolean).at(-1) ?? JSON.stringify({ type: 'run_end', status: second.status === 0 ? 'passed' : 'failed' }))
  process.exit(second.status ?? 2)
}

process.exit(first.status ?? 2)
