# Testing Guidelines

## Scope

These rules define how new behavior must be introduced in TrocaAi.

## TDD requirement

- Every new behavior must start with a test that fails for the intended reason.
- Implementation only starts after the test exists and demonstrates the missing behavior.
- If a change touches existing behavior, add or update a test before changing the implementation.
- Prefer the smallest test that proves the rule or regression being added.

## Validation flow

- Keep the red-green-refactor cycle explicit in each task.
- Do not merge feature code without at least one test that covers the new behavior.
- When a change is purely scaffolding, add a smoke test that proves the toolchain works.