# Backend Guidelines

## Scope

These rules apply to API handlers, services, repositories, migrations, and persistence code.

## Persistence

- Use PostgreSQL for relational data only.
- Keep the album catalog outside the database as documented in the business rules.
- Validate that album identifiers and sticker codes exist in the catalog before persistence.

## API design

- Keep handlers thin and delegate business logic to services.
- Map each endpoint to a clear use case.
- Keep input validation close to the request boundary.
- Return domain-friendly errors instead of leaking internal implementation details.

## Data access

- Isolate database access behind repositories or data access modules.
- Keep queries focused and readable.
- Avoid mixing SQL, orchestration, and response formatting in the same function.

## Domain rules

- Match, trade, collection, and sticker behavior must follow the published contract.
- Do not introduce an Album table while the JSON catalog remains the source of truth.
- Keep the location cache separate from PostgreSQL and treat it as ephemeral.

## Service design

- Services should coordinate one use case at a time.
- If a service starts validating, querying, transforming, and notifying all together, split it.
- Prefer explicit dependencies over hidden globals.

## Refactoring rule

- When a module starts to mix transport, persistence, and domain decisions, extract responsibilities into smaller units.
