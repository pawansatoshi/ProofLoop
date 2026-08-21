# ProofLoop

> **AI builds. Kane verifies. Evidence decides.**

ProofLoop is an evidence-based release gate for AI-built software. It pairs a real browser-testable mini application with requirement-level verification so a release is based on observable behavior rather than an agent saying "done".

## The problem

AI coding agents can produce working-looking code quickly, but generated software can still fail in the browser. ProofLoop makes runtime verification a first-class release decision.

## The product

### ProofBoard

ProofBoard is the real application surface used as the browser verification target. A reviewer can:

1. Create a project
2. Add a task
3. Complete the task
4. Delete the task
5. Return to the dashboard and verify the workspace remains consistent

The state is intentionally local and deterministic so the full flow can be exercised without external services or credentials.

### ProofLoop control center

The control center presents:

- requirement status,
- release gate state,
- verification history,
- evidence ledger,
- agent ↔ Kane repair-loop visualization,
- the real ProofBoard target.

Controlled demo fixtures are explicitly separated from genuine Kane evidence and can never approve the release. Genuine release proof is accepted only from actual Kane execution.

## Agent ↔ Kane loop

The repository includes `npm run verify:loop` as the agent-facing verification entry point. It runs Kane in `--agent --headless` mode, preserves the NDJSON stream under `.testmuai/output/`, and returns a non-zero status on failure so the coding agent can inspect the evidence, fix the root cause, and rerun the same command.

`AGENTS.md` defines the expected loop:

```text
agent change → Kane run → structured result/evidence → root-cause fix → Kane rerun → regression proof
```

An optional `KANE_REPAIR_COMMAND` can be supplied by an agent environment when unattended repair is supported. The project never treats simulated output as proof.

## Kane test definitions

Kane CLI test definitions live under `.testmuai/tests/` using Kane's `test.md` format. The repository includes both a local verification flow and a production Vercel smoke flow.

Run locally:

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

For an interactive local run, authenticate Kane with the CLI and then run:

```bash
npm install -g @testmuai/kane-cli
kane-cli login
npm run verify:kane
```

For production verification:

```bash
npm run verify:kane:production
```

In CI, Kane uses `LT_USERNAME` and `LT_ACCESS_KEY` GitHub Actions secrets and passes them directly to the headless test command; no interactive login is used.

Every genuine Kane run can produce machine-readable result/evidence artifacts. Do not treat the UI's controlled demo state as a substitute for those artifacts.

## Build and verification

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run verify:loop
```

The GitHub Actions CI workflow enforces typecheck, lint, production build, and a high-severity dependency audit. The Kane workflow authenticates non-interactively with GitHub Secrets, runs the local and production flows, and uploads Kane output as a workflow artifact.

## Deployment

### Vercel — primary production deployment

ProofLoop is deployed as a Vite application on Vercel. The current production project is:

**https://proof-loop-bice.vercel.app/**

The Vercel project uses the repository's `main` branch and the existing production build command:

```text
npm run build
```

Vercel detects the Vite framework and serves the generated `dist/` output. The stable project domain above should be used for the hackathon live URL.

GitHub Pages is not part of the release gate. The repository intentionally relies on Vercel as the single judge-facing production deployment so an unconfigured Pages environment cannot create a false CI failure.

## Architecture

```text
AI coding agent
    |
    v
ProofBoard change
    |
    v
Kane CLI (--agent --headless)
    |
    +---- PASS ----> genuine evidence ----> release gate
    |
    +---- FAIL ----> NDJSON/evidence ----> agent root-cause fix
                                      |
                                      v
                                 Kane re-run
```

## Project structure

```text
ProofLoop/
├── src/
│   ├── main.tsx
│   └── styles.css
├── scripts/
│   └── kane-loop.mjs
├── .testmuai/tests/
│   ├── proofboard_release_test.md
│   └── proofboard_production_test.md
├── .github/workflows/
│   ├── ci.yml
│   └── kane.yml
├── AGENTS.md
├── eslint.config.mjs
├── .env.example
├── HACKATHON_REQUIREMENTS.md
├── BUILD_STATUS.md
├── DEMO_SCRIPT.md
├── docs/KANE_RUNBOOK.md
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Security

No Kane credentials are stored in this repository. Kane authentication is managed by the CLI's credential store locally or GitHub Actions Secrets in CI. Do not commit `.env` files, browser/session credentials, Kane access keys, or generated evidence packs.

The application has no backend and no production secret requirement.

## Submission checklist

Before submitting, verify all of the following with real evidence:

- [x] Repository is public or judges have access
- [x] README contains setup instructions
- [x] ProofBoard primary flow is implemented end-to-end
- [ ] Kane CLI has actually run against the app
- [ ] Genuine Kane result/evidence pack has been reviewed
- [ ] Agent-triggered Kane run and Kane-result-driven repair interaction has been demonstrated
- [x] Vercel production deployment builds successfully
- [x] Vercel production endpoint returns HTTP 200
- [ ] Vercel production CRUD flow has been smoke-tested in a real browser session
- [ ] Demo video is 3 minutes or less and shows the app plus Kane running
- [ ] One-paragraph submission explanation is prepared
- [x] Live URL is available: https://proof-loop-bice.vercel.app/
- [ ] Repository history satisfies the hackathon's post-kickoff requirement

## Demo thesis

**AI builds. Kane verifies. Evidence decides.**
