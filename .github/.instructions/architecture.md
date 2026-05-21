# Architecture Guidelines

## Scope

These instructions define how the TrocaAi codebase should be organized from the start.

## Mandatory stack

- Next.js for the application shell and web experience.
- TypeScript for all application code.
- PostgreSQL for persistent relational data.
- Docker for local development and execution.

## Core principles

- Keep domain rules aligned with the business docs.
- Separate presentation, application, domain, and infrastructure concerns.
- Prefer small modules with a single responsibility.
- Split classes and services when a responsibility starts to mix data access, validation, and orchestration.
- Keep technical decisions explicit and local to the relevant layer.

## Structure rules

- UI components must not contain database access.
- API handlers must not embed complex domain logic.
- Domain rules must not depend on framework-specific details.
- Infrastructure code must adapt to the domain, not the opposite.

## Documentation alignment

- Catalogue structure must follow the JSON contract defined in the business docs.
- Relational entities must follow the model documented in the data model docs.
- Endpoint behavior must follow the API contract docs.

## Refactoring rule

- If a file, class, or function accumulates unrelated responsibilities, it must be refactored before new behavior is added.
