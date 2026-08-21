---
mode: testing
url: http://127.0.0.1:5173/
headless: true
max_steps: 60
tags: [proofloop, proofboard, release, smoke]
---

# ProofBoard release verification

## Open the real ProofBoard
Open http://127.0.0.1:5173/ and verify the ProofLoop control center is visible. Click the "Open ProofBoard" button. Verify the ProofBoard page is visible with the heading "Real application surface", a "Project name" input, and a "Create project" button.

## Create a project
In the Project name input, type exactly "Kane Release Proof". Click "Create project". Assert that a project card containing the exact text "Kane Release Proof" is visible and selected. Do not use screenshots as the primary assertion; inspect the live DOM/UI text.

## Add a task
In the Task title input, type exactly "Verify release". Click "Add task". Assert that the active project contains a visible task row with the exact text "Verify release" and that the project shows "1 task".

## Complete the task
For the task row containing the exact text "Verify release", click its completion control. Assert that the task row is visibly marked completed (the row changes to the completed visual state) and the task text remains visible.

## Delete the task
For the task row containing the exact text "Verify release", click the button whose accessible label is "Delete Verify release". Assert that the exact text "Verify release" is no longer visible anywhere in the task list. Assert that the active project heading still says "Kane Release Proof" and the project card still shows "0 tasks". Do not search for a screenshot or invent evidence; verify the current live UI state directly.

## Verify project persistence
Click the project card containing the exact text "Kane Release Proof" if necessary. Assert that it remains the selected active project and that the active-project heading still reads "Kane Release Proof". Assert that the task list shows the empty-state message "No tasks yet. Add the first task.".

## Verify dashboard consistency
Click the "Overview" navigation item. Assert that the ProofLoop dashboard is visible and the requirement matrix contains all five release requirements with these exact titles: "Create project", "Add task", "Complete task", "Delete task", and "Dashboard state". Do not run the controlled demo and do not inject the R4 fault.

## Release evidence boundary
This is the genuine release verification only. The controlled R4 demo is a separate test and must not be opened or executed during this run. A successful run means the live application flow above was directly verified by Kane; do not require a screenshot, pre-existing evidence artifact, or fabricated evidence to pass a step.
