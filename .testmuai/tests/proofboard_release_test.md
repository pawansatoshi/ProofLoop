---
mode: testing
url: http://127.0.0.1:5173/
max_steps: 40
tags: [proofloop, release, smoke]
---

# ProofBoard release verification

## Open ProofLoop
Open http://127.0.0.1:5173/ and verify the ProofLoop control center is visible.

## Verify the requirement matrix
Verify that the page shows five requirements: Create project, Add task, Complete task, Delete task, and Dashboard state.

## Exercise the verification demo
Click the "Run verification demo" button and verify that a controlled verification failure is shown and the release gate becomes blocked.

## Inspect failure evidence
Open the Evidence view and verify that the failure context identifies R4 Delete task and explains that the task remained visible after deletion.

## Run the repair loop
Trigger the available repair and re-verification action. Verify that the interface reports the repair loop and returns to a fully proven state.

## Verify release approval
Verify that the release gate reports 5/5 proven and RELEASE APPROVED after the repair completes.
