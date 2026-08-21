---
mode: testing
url: https://proof-loop-bice.vercel.app/
headless: true
max_steps: 45
tags: [proofloop, proofboard, production, smoke]
---

# ProofBoard production verification

## Open the deployed application
Open https://proof-loop-bice.vercel.app/ and verify the ProofLoop control center is visible. Click the "Open ProofBoard" button. Verify the ProofBoard page is visible with the heading "Real application surface", a "Project name" input, and a "Create project" button.

## Create a project
In the Project name input, type exactly "Kane Production Proof". Click "Create project". Assert that a project card containing the exact text "Kane Production Proof" is visible and selected. Inspect the live UI/DOM rather than relying on screenshots.

## Add a task
In the Task title input, type exactly "Verify production". Click "Add task". Assert that the active project contains a visible task row with the exact text "Verify production" and that the project shows "1 task".

## Complete the task
For the task row containing the exact text "Verify production", click its completion control. Assert that the task row is visibly marked completed and the task text remains visible.

## Delete the task
For the task row containing the exact text "Verify production", click the button whose accessible label is "Delete Verify production". Assert that the exact text "Verify production" is no longer visible anywhere in the task list. Assert that the active project heading still says "Kane Production Proof" and the project card shows "0 tasks". Verify the live UI state directly; do not search for screenshot evidence.

## Verify project persistence
Click the project card containing the exact text "Kane Production Proof" if necessary. Assert that it remains selected and that the active-project heading still reads "Kane Production Proof". Assert that the task list shows "No tasks yet. Add the first task.".

## Verify dashboard consistency
Click the "Overview" navigation item. Assert that the ProofLoop dashboard is visible and the requirement matrix contains all five release requirements with these exact titles: "Create project", "Add task", "Complete task", "Delete task", and "Dashboard state". Do not run the controlled demo and do not inject the R4 fault.

## Stop after the production assertions
After the dashboard consistency assertions pass, stop the verification and report success. Do not open the "Evidence" navigation item, do not wait for an evidence ledger to update, and do not expect the Evidence page to change during this run. The Evidence page is a release-reporting UI and is not a prerequisite for this live smoke test. Do not perform any additional navigation or actions after the dashboard assertions.

## Production evidence boundary
This is the genuine production smoke verification only. The controlled R4 demo is a separate test and must not be opened or executed during this run. A successful run means the deployed application flow was directly verified by Kane.
