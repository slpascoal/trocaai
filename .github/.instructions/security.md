# Security Guidelines

## Scope

These rules apply to both frontend and backend code.

## Data handling

- Minimize the amount of sensitive data exposed to the frontend.
- Never hardcode credentials or secrets in code.
- Keep secret values in environment variables or secret stores.
- Validate and sanitize all external input.

## Backend security

- Protect API routes with explicit access checks when they are added.
- Avoid returning internal stack details in errors.
- Keep database queries parameterized.
- Do not trust client-provided identifiers without validation.

## Frontend security

- Never assume data hidden in the UI is protected.
- Do not persist secrets in browser storage.
- Keep user-visible payloads limited to the current task.

## Operational security

- Treat logs as potentially sensitive.
- Avoid emitting secrets or raw personal data in console output.
- Review any new dependency before adding it to the stack.
