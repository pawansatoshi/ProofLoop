---
mode: testing
url: http://127.0.0.1:5173/
headless: true
max_steps: 45
tags: [proofloop, proofboard, release, smoke]
---

# ProofBoard release verification

## Open the real ProofBoard
Open http://127.0.0.1:5173/ and verify the ProofLoop control center is visible. Open the ProofBoard view and verify the real application surface is visible.

## Create a project
Create a project named "Kane Release Proof". Verify the project appears in the project list and is selected as the active project.

## Add a task
Add a task named "Verify release" to the active project. Verify the task appears in the task list.

## Complete the task
Mark "Verify release" as complete. Verify the task is visibly marked completed.

## Delete the task
Delete "Verify release". Verify the task is no longer visible in the task list.

## Verify project persistence
Verify that the active project "Kane Release Proof" is still visible and selected in the project list after the task is deleted.

## Verify dashboard consistency
Return to Overview. Verify the ProofLoop dashboard is visible and the requirement matrix still shows the five release requirements: Create project, Add task, Complete task, Delete task, and Dashboard state.

## Verify the controlled repair narrative
Run the controlled demo. Verify the release gate becomes blocked and the failure identifies R4 Delete task as a controlled demo failure. Open Evidence, trigger the demo repair, and verify the interface reports a completed controlled cycle while explicitly stating that genuine Kane evidence is still required.
