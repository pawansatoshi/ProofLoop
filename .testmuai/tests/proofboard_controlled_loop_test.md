---
mode: testing
url: http://127.0.0.1:5173/
headless: true
max_steps: 35
tags: [proofloop, proofboard, controlled-demo]
---

# ProofBoard controlled repair narrative

This test is a demonstration fixture only and MUST NOT be used as release evidence.

## Open the real ProofLoop control center
Open http://127.0.0.1:5173/ and verify the ProofLoop control center is visible.

## Reproduce the controlled R4 failure
Open the ProofBoard view. Enable the controlled R4 failure path using the application's documented demo control. Create a project, add a task, complete it, delete it, and verify that the injected failure leaves the task visible. Verify the interface identifies R4 Delete task as a controlled demo failure and that the release gate remains blocked.

## Verify the evidence boundary
Open Evidence and verify the controlled failure is explicitly labeled as demo-only and cannot approve release.

## Verify the controlled repair narrative
Trigger the controlled repair demo and verify the interface reports the controlled cycle as completed while explicitly stating that genuine Kane evidence is still required.

## Final boundary
Do not mark any requirement as genuine Kane evidence from this test. This test exists only to demonstrate failure → evidence → repair → re-run concept; the genuine release gate is the separate release test.
