# ProofLoop — 3-minute demo

## Final recording

**Submitted demo:** https://youtu.be/INqey2G9wac

**Production app:** https://proof-loop-bice.vercel.app/

**Repository:** https://github.com/pawansatoshi/ProofLoop

## 0:00–0:20 — Problem

AI coding agents can produce software faster than humans can verify it. ProofLoop makes runtime evidence a release requirement.

## 0:20–0:45 — Product

Show the ProofLoop control center and the five ProofBoard requirements.

Say: **AI builds. Kane verifies. Evidence decides.**

## 0:45–1:20 — Real application

Open **ProofBoard** on the production deployment.

- Create a project.
- Add a task.
- Mark it complete.
- Delete it.
- Show that the project remains available and the task disappears.

This establishes that ProofBoard is a real interactive flow, not a screenshot or mock.

## 1:20–1:45 — Kane verification

Show Kane exercising the committed browser test and keep the genuine result/evidence visible.

The production workflow uses the canonical Vercel URL and authenticated headless Kane execution in CI.

## 1:45–2:15 — Failure / repair narrative

Show the controlled failure demo only as a visual explanation of the intended loop: failure → evidence → repair → re-verification.

Explicitly distinguish the controlled UI fixture from genuine Kane evidence.

## 2:15–2:45 — Evidence

Show the real Kane result/evidence pack and the requirement-level checks it proved. If a real regression was encountered during development, show the failed run followed by the repair that produced the verified result.

## 2:45–3:00 — Release decision

Return to ProofLoop and show the requirement matrix alongside the genuine Kane result.

Close with:

> AI builds. Kane verifies. Evidence decides.

## Recording integrity rule

Never present the controlled demo's simulated PASS as genuine Kane proof. The actual Kane execution and its machine-readable evidence are the verification source.

## Submission status

The final demo has been recorded and submitted. Any future recording should preserve the same distinction between demonstration fixtures and genuine verification evidence.
