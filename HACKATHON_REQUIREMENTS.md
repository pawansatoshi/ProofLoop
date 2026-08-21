# Hackathon Compliance Checklist

This file distinguishes repository facts from externally verified submission facts. The official Kane CLI Online Hackathon brief says the app must work end-to-end, Kane must actually catch or prove something meaningful, the agent and Kane must interact, and the submission must include a repository, a <=3-minute demo, a one-paragraph explanation, and a live URL or one-command runnable path. citeturn4search0

## Repository implementation

- [x] Public repository: `pawansatoshi/ProofLoop`
- [x] React + TypeScript + Vite app
- [x] Real ProofBoard primary flow
- [x] Five requirement model
- [x] Committed Kane `_test.md` flow
- [x] `npm run verify:kane` command
- [x] Manual GitHub Actions Kane workflow
- [x] GitHub Actions build/typecheck workflow
- [x] GitHub Pages deployment workflow
- [x] README setup instructions

## External verification still required

- [ ] Real Kane CLI authentication
- [ ] Real Kane browser execution against ProofBoard
- [ ] Genuine Kane evidence pack reviewed
- [ ] Agent-triggered Kane run or Kane result feeding the agent repair loop
- [ ] Live deployment verified in a real browser
- [ ] 3-minute demo video recorded with the app and Kane running
- [ ] One-paragraph submission explanation finalized
- [ ] Submission form completed

## Official submission bars

### Ships

- [x] The repository contains a real interactive ProofBoard flow.
- [ ] Final deployed or one-command runnable flow verified end-to-end from a clean environment.

### Verified

- [x] Kane test definition is committed.
- [ ] Kane has actually run and produced genuine evidence.

### Closed loop

- [x] Repository provides a direct `npm run verify:kane` path for an agent to invoke.
- [ ] Demonstrate the actual agent → Kane trigger and Kane result → repair interaction.

### Craft

- [x] ProofLoop has a focused evidence-first product narrative.
- [x] UI explicitly separates controlled demo state from genuine Kane evidence.

## Repository timing rule

The official brief says the repo must be initialized after the kickoff and that commit history is checked. Current repository commits begin on 20 August 2026, after the stated 19 August kickoff date in the rules section. Verify the exact kickoff/submission timing against the submission form before final submission. citeturn4search0

## Date note

The currently published event page contains conflicting date text in different sections. Its challenge section and submission section mention 21 August, while another schedule section mentions 31 August. Treat the submission form/current organizer instruction as authoritative for the final deadline rather than relying on this repository document. citeturn4search0
