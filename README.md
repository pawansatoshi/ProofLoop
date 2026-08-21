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
- repair-loop visualization,
- the real ProofBoard target.

A controlled failure → repair → re-verification interaction is included for a reproducible demo narrative. **Controlled demo results are explicitly not represented as genuine Kane evidence.** Genuine evidence comes only from an actual Kane execution.

## Kane test definitions

Kane CLI test definitions live under `.testmuai/tests/` using Kane's `test.md` format. The repository test exercises the real ProofBoard CRUD flow and the controlled repair narrative.

Run locally:

```bash
npm install
git status
npm run dev
```

Open `http://127.0.0.1:5173/`.

Then authenticate Kane and run:

```bash
npm install -g @testmuai/kane-cli
kane-cli login
npm run verify:kane
```

Every genuine Kane run produces result/evidence artifacts. Do not treat the UI's controlled demo state as a substitute for those artifacts.

## Build and verification

```bash
npm install
npm run typecheck
npm run build
npm run preview
```

The GitHub Actions CI workflow runs dependency installation, TypeScript verification, and the production build on pushes and pull requests targeting `main`.

## Deployment

ProofLoop is configured for GitHub Pages through `.github/workflows/deploy.yml`. The production site is intended to be available at:

**https://pawansatoshi.github.io/ProofLoop/**

GitHub Pages must have **Settings → Pages → Source → GitHub Actions** enabled once for the repository. After that, pushes to `main` build and deploy `dist/` automatically.

## Architecture

```text
Requirement
    |
    v
ProofBoard application
    |
    v
Kane CLI browser verification
    |
    +---- PASS ----> Evidence ----> Release approved
    |
    +---- FAIL ----> Evidence ----> Agent repair ----> Kane re-verification
```

## Project structure

```text
ProofLoop/
├── src/
│   ├── main.tsx
│   └── styles.css
├── .testmuai/tests/
│   └── proofboard_release_test.md
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
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

No Kane credentials are stored in this repository. Kane authentication is managed by the CLI's credential store. Do not commit `.env` files, browser/session credentials, Kane access keys, or generated evidence packs.

The application has no backend and no production secret requirement.

## Submission checklist

Before submitting, verify all of the following with real evidence:

- [ ] Repository is public or judges have access
- [ ] README contains setup instructions
- [ ] ProofBoard primary flow works end-to-end
- [ ] Kane CLI has actually run against the app
- [ ] Genuine Kane result/evidence pack has been reviewed
- [ ] Demo video is 3 minutes or less and shows the app plus Kane running
- [ ] One-paragraph submission explanation is prepared
- [ ] Live URL or one-command runnable path works in under 30 seconds
- [ ] Repository history satisfies the hackathon's post-kickoff requirement

## Demo thesis

**AI builds. Kane verifies. Evidence decides.**
