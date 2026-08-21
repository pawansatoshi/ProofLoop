---
mode: testing
url: https://proof-loop-bice.vercel.app/
headless: true
max_steps: 45
tags: [proofloop, proofboard, production, smoke]
---

# ProofBoard production verification

## Open the deployed application
Open https://proof-loop-bice.vercel.app/ and verify the ProofLoop control center is visible. Open the ProofBoard view and verify the real application surface is visible.

## Create a project
Create a project named "Kane Production Proof". Verify the project appears in the project list and is selected as the active project.

## Add a task
Add a task named "Verify production" to the active project. Verify the task appears in the task list.

## Complete the task
Mark "Verify production" as complete. Verify the task is visibly marked completed.

## Delete the task
Delete "Verify production". Verify the task is no longer visible in the task list.

## Verify project persistence
Verify that the active project "Kane Production Proof" is still visible and selected in the project list after the task is deleted.

## Verify dashboard consistency
Return to Overview. Verify the ProofLoop dashboard is visible and the requirement matrix still shows the five release requirements: Create project, Add task, Complete task, Delete task, and Dashboard state.
