# Kane Runbook

## 1. Install

```bash
npm install -g @testmuai/kane-cli
kane-cli --version
```

Node.js 18+ is required for the npm installation path.

## 2. Start ProofLoop

```bash
npm install
npm run dev
```

The local target is `http://127.0.0.1:5173/`.

## 3. Authenticate

Use the current Kane CLI authentication flow. Do not put credentials in the repository.

## 4. Run the repository test

```bash
kane-cli testmd run .testmuai/tests/proofboard_release_test.md
```

The test should exercise the actual browser application. Inspect Kane's generated result/evidence output after the run.

## 5. Evidence rule

A green UI inside ProofLoop is not itself proof of a Kane run. Only an actual Kane execution result/evidence pack can be used as hackathon verification evidence.

## 6. Controlled failure

The current ProofLoop demo contains a deterministic failure/recovery interaction to make the narrative reproducible. For the final hackathon demo, replace any simulated result with the corresponding real Kane execution evidence and show the actual command/output where appropriate.
