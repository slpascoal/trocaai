# Docker Guidelines

## Scope

These rules define how the TrocaAi project must be executed during development.

## Mandatory workflow

- Run development, test, and validation commands inside the application container.
- Do not rely on host execution for project commands when the container is available.
- Keep the container setup aligned with the application stack.

## Environment rules

- Use Docker for local reproducibility.
- Keep environment variables explicit and documented.
- Separate application runtime concerns from local tooling concerns.

## Operational rules

- Prefer deterministic commands and scripts.
- Keep the container entrypoint and startup flow simple.
- Ensure services needed by the app, such as PostgreSQL, are reachable in the containerized environment.

## Validation rule

- Any command that changes code, runs tests, checks types, or performs validation must be executed in the container context.
