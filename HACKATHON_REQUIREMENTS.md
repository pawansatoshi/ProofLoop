# Hackathon Compliance Checklist

This file distinguishes repository facts from externally verified submission facts. The official Kane CLI Online Hackathon brief requires a working app, meaningful Kane verification, an agent ↔ Kane interaction, and a short demo plus live URL/runnable path. The judging weights Ships, Verified, Closed loop, and Craft equally, with ties broken on Closed loop.

## Repository implementation

- [x] Public repository: `pawansatoshi/ProofLoop`
- [x] React + TypeScript + Vite app
- [x] Real ProofBoard primary flow
- [x] Five requirement model
- [x] Committed Kane local `_test.md` flow
- [x] Committed Kane production `_test.md` flow targeting the Vercel deployment
- [x] `npm run verify:kane` command with agent/headless NDJSON output
- [x] `npm run verify:kane:production` command
- [x] `npm run verify:loop` agent-facing self-healing loop runner
- [x] `AGENTS.md` defines the Kane failure → root-cause fix → rerun protocol
- [x] GitHub Actions Kane workflow with local + production verification, real Chrome, authenticated headless execution, and evidence artifacts
- [x] Kane workflow runs on main pushes and can also be dispatched manually
- [x] GitHub Actions CI typecheck + lint + build + dependency audit workflow
- [x] GitHub Pages deployment workflow retained as fallback
- [x] Vercel production project configured from the GitHub repository
- [x] Latest Vercel production deployment reached READY after the release-gate fixes
- [x] README setup and deployment instructions

## External verification still required

- [ ] Real Kane CLI authentication
- [ ] Real Kane browser execution against ProofBoard
- [ ] Genuine Kane evidence pack reviewed
- [ ] Actual agent-triggered Kane run and repair interaction demonstrated
- [x] Vercel production endpoint verified HTTP 200
- [ ] Vercel production CRUD flow verified in a real browser session
- [ ] 3-minute demo video recorded with the app and Kane running
- [ ] One-paragraph submission explanation finalized
- [ ] Submission form completed

## Official submission bars

### Ships

- [x] The repository contains a real interactive ProofBoard flow.
- [x] A Vercel production deployment is configured and the latest deployment reached READY.
- [ ] Final deployed CRUD flow verified end-to-end from a clean browser session.

### Verified

- [x] Kane test definitions are committed for local and production flows.
- [ ] Kane has actually run and produced genuine evidence.

### Closed loop

- [x] Repository provides `npm run verify:loop` for an AI coding agent to invoke Kane in agent/headless mode.
- [ ] Demonstrate the actual agent → Kane trigger and Kane-result → repair interaction with a genuine run.

### Craft

- [x] ProofLoop has a focused evidence-first product narrative.
- [x] UI separates controlled demo state from genuine Kane evidence.
- [x] Release approval is impossible from demo fixtures alone.

## Deployment

Primary live URL for submission:

`https://proof-loop-bice.vercel.app/`

Fallback deployment path:

`https://pawansatoshi.github.io/ProofLoop/`

The Vercel deployment is the preferred judge-facing URL because it is the current primary production deployment for the repository.

## Repository timing rule

The official brief requires the repository to be initialized after the kickoff and says commit history is checked. Current repository commits begin on 20 August 2026, after the published 19 August kickoff reference. Verify the exact kickoff/submission timing against the organizer's current submission form/instructions before final submission.

## Date note

The published event page currently contains conflicting date text in different sections. Treat the current organizer/submission form as authoritative for the final deadline.
