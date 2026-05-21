# Code Standards

## Language and naming

- Use English for variables, functions, classes, types, and file names where practical.
- Prefer descriptive names over short names.
- Avoid abbreviations unless they are standard in the domain.
- Keep boolean names explicit.

## TypeScript rules

- Prefer explicit types at boundaries.
- Avoid `any` unless there is no practical alternative and the reason is documented in the task context.
- Model domain concepts with types, interfaces, enums, or union types as appropriate.
- Keep pure transformations separate from side effects.

## Function design

- Keep functions small and focused.
- A function should do one thing.
- If a function needs branching for unrelated concerns, split it into helpers.
- Prefer composition over large procedural blocks.

## Class design

- Use classes only when they clarify responsibility.
- Do not create classes that only group unrelated helpers.
- If a class manages validation, persistence, and orchestration together, split it.

## Comments

- Do not add comments as a default practice.
- Rely on clear naming and structure instead of explanatory comments.
- Only use comments when the code cannot express an important constraint otherwise.

## Readability

- Preserve local clarity over clever abstractions.
- Keep code easy to scan and easy to test.
- Prefer small files over oversized files when a module becomes difficult to follow.
