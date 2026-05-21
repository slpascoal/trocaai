# Frontend Guidelines

## Scope

These rules apply to the Next.js frontend and any browser-executed code.

## Core rules

- Keep UI logic separate from business rules.
- Do not expose sensitive data in the browser unless it is required for the current user experience.
- Treat the frontend as a consumer of backend contracts, not as a second source of truth.
- Render catalog and collection data from the documented JSON-driven structure.

## State and data handling

- Validate data at the boundary before rendering it.
- Do not duplicate backend rules in ad hoc UI logic.
- Keep transient match inputs such as location tied to the current interaction only.
- Avoid storing unnecessary sensitive information in local storage or other persistent browser storage.

## Component design

- Build components that do one visual job.
- Extract repeated UI patterns into reusable components only when they stay focused.
- Keep forms, lists, and detail views separate when their responsibilities differ.

## Security on the frontend

- Never place secrets in client bundles.
- Never assume hidden UI fields are secure.
- Show only the data the current user needs for the current action.
- Treat user-provided values as untrusted until validated.

## Refactoring rule

- If a component mixes rendering, fetching, state orchestration, and domain decisions, split it into smaller units.
