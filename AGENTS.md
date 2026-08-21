# ProofLoop agent verification loop

After every meaningful application change, run `npm run verify:loop`.

The command runs Kane CLI in agent/headless mode and preserves structured output at `.testmuai/output/kane-result.ndjson`.

If Kane fails:
1. Read the NDJSON `run_end` result and referenced evidence/logs.
2. Reproduce the failure locally.
3. Fix the root cause, not the assertion.
4. Re-run `npm run typecheck`, `npm run lint`, and `npm run verify:loop`.
5. Continue until the real Kane run passes.

Never convert a demo fixture, mocked result, or UNKNOWN state into release evidence. Only genuine Kane execution can satisfy the release gate.
