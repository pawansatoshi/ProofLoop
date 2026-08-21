# Kane Runbook

## 1. Install

```bash
npm install -g @testmuai/kane-cli@0.7.0
kane-cli --version
```

Node.js 18+ is required for the npm installation path. Kane CLI launches Google Chrome for browser verification.

## 2. Start ProofLoop

```bash
npm install
npm run dev
```

The local target is `http://127.0.0.1:5173/`.

## 3. Authenticate

Use the current Kane CLI authentication flow. Do not put credentials in the repository.

Interactive:

```bash
kane-cli login
```

For CI/non-interactive execution, use the GitHub Actions secret store and pass `--username` / `--access-key` to `kane-cli login`.

## 4. Run the repository test

```bash
npm run verify:kane
```

Equivalent direct command:

```bash
kane-cli testmd run .testmuai/tests/proofboard_release_test.md
```

The committed test exercises the real ProofBoard CRUD flow and the controlled repair narrative. Inspect the generated result/evidence output after the run.

## 5. Evidence rule

A green UI inside ProofLoop is not itself proof of a Kane run. Only an actual Kane execution result/evidence pack can be used as hackathon verification evidence. Kane's documentation states that each run produces a sealed evidence pack containing results and browser artifacts.

## 6. Manual GitHub Actions verification

The repository contains `.github/workflows/kane.yml` as a manual verification workflow.

Configure these repository Actions secrets:

- `LT_USERNAME`
- `LT_ACCESS_KEY`

Then run **Kane Verification** from the GitHub Actions tab. The workflow starts ProofLoop, authenticates Kane, and runs the committed test headlessly.

## 7. Controlled failure

The current ProofLoop UI contains a deterministic failure/recovery interaction to make the narrative reproducible. It is explicitly labeled as controlled demo state. For the final hackathon demo, show the actual Kane CLI run and genuine evidence rather than presenting the UI simulation as verification.
