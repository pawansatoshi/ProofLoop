# Hackathon Compliance Checklist

This file distinguishes repository facts from externally verified submission facts. ProofLoop is submitted to the Kane CLI Online Hackathon with a working app, meaningful Kane verification, a production deployment, a short demo, and a live URL.

## Repository implementation

- [x] Public repository: `pawansatoshi/ProofLoop`
- [x] React + TypeScript + Vite app
- [x] Real ProofBoard primary flow
- [x] Five requirement model
- [x] Committed Kane local `_test.md` flow
- [x] Committed Kane production `_test.md` flow targeting the canonical Vercel deployment
- [x] `npm run verify:kane` command with agent/headless NDJSON output
- [x] `npm run verify:kane:production` command
- [x] `npm run verify:loop` agent-facing self-healing loop runner
- [x] `AGENTS.md` defines the Kane failure → root-cause fix → rerun protocol
- [x] GitHub Actions Kane workflow with local + production verification, real Chrome, non-interactive authenticated headless execution, and evidence artifacts
- [x] Kane workflow runs on main pushes and can also be dispatched manually
- [x] GitHub Actions CI typecheck + lint + build + dependency audit workflow
- [x] Vercel production project configured from the GitHub repository
- [x] Vercel production deployment path is the canonical judge-facing release path
- [x] README setup, deployment, demo, and submission information

## External verification

- [x] Real Kane CLI authentication in GitHub Actions with valid `LT_USERNAME` and `LT_ACCESS_KEY` repository secrets
- [x] Real Kane browser execution against ProofBoard
- [x] Genuine Kane evidence pack reviewed
- [ ] Actual agent-triggered Kane run and repair interaction demonstrated end-to-end with a dedicated genuine run
- [x] Vercel production endpoint verified
- [x] Vercel production CRUD flow verified in a clean browser session by the production Kane test
- [x] 3-minute demo video recorded and submitted
- [x] One-paragraph submission explanation finalized
- [x] Submission form completed

## Official submission bars

### Ships

- [x] The repository contains a real interactive ProofBoard flow.
- [x] A Vercel production deployment is configured.
- [x] The deployed CRUD flow has been verified through the production Kane flow.

### Verified

- [x] Kane test definitions are committed for local and production flows.
- [x] Kane has actually run and produced genuine evidence.

### Closed loop

- [x] Repository provides `npm run verify:loop` for an AI coding agent to invoke Kane in agent/headless mode.
- [ ] The full agent → Kane trigger → Kane-result → repair → rerun interaction has been demonstrated as a dedicated genuine run.

### Craft

- [x] ProofLoop has a focused evidence-first product narrative.
- [x] UI separates controlled demo state from genuine Kane evidence.
- [x] Release approval is impossible from demo fixtures alone.

## Final submission links

- **Repository:** `https://github.com/pawansatoshi/ProofLoop`
- **Production:** `https://proof-loop-bice.vercel.app/`
- **Demo video:** `https://youtu.be/INqey2G9wac`
- **Primary lane:** Verification baked into your workflow

## Deployment

Primary live URL for judges:

`https://proof-loop-bice.vercel.app/`

Vercel is the single judge-facing production deployment. GitHub Pages is intentionally not used as a release gate because the repository does not require a Pages environment for the hackathon submission.

## Repository timing rule

The repository history begins after the published kickoff reference, satisfying the post-kickoff initialization requirement reflected in the project checklist.

## Evidence integrity rule

A controlled UI fixture may explain the intended failure/repair loop, but it is never genuine Kane proof. Genuine verification comes from Kane execution against the real ProofBoard flow and its machine-readable evidence artifacts.
