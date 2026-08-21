# ProofLoop — 3-minute demo

## 0:00–0:20 — Problem

AI coding agents can produce software faster than humans can verify it. ProofLoop makes runtime evidence a release requirement.

## 0:20–0:45 — Product

Show the ProofLoop control center and the five ProofBoard requirements.

Say: **AI builds. Kane verifies. Evidence decides.**

## 0:45–1:20 — Real application

Open **ProofBoard**.

- Create `Kane Release Proof`.
- Add `Verify release`.
- Mark it complete.
- Delete it.
- Show that the project remains available and the task disappears.

This establishes that ProofBoard is a real interactive flow, not a screenshot or mock.

## 1:20–1:45 — Kane verification

Switch to the terminal and run:

```bash
npm run verify:kane
```

Show Kane opening the real browser and exercising the committed test. Keep the genuine result/evidence visible.

## 1:45–2:15 — Failure / repair narrative

Show the controlled failure demo only as a visual explanation of the intended loop: failure → evidence → repair → re-verification.

Explicitly distinguish the controlled UI fixture from genuine Kane evidence.

## 2:15–2:45 — Evidence

Show the real Kane result/evidence pack and the requirement-level checks it proved. If Kane found a real regression during development, show the failed run first and then the repair.

## 2:45–3:00 — Release decision

Return to ProofLoop and show the requirement matrix alongside the genuine Kane result.

Close with:

> AI builds. Kane verifies. Evidence decides.

**Recording rule:** never present the controlled demo's simulated PASS as genuine Kane proof. The actual Kane run is the verification evidence.
