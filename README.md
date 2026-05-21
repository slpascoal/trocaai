# TrocaAi

Documentação inicial do produto e das regras de negócio:

- [Visão geral e regras de negócio](docs/business-rules.md)
- [Modelo de dados](docs/data-model.md)
- [Contrato da API](docs/api-contract.md)


## Instruções Técnicas do TrocaAi

Também temos o conjunto de regras técnicas para orientar a implementação do projeto.

Ordem de leitura:

1. [.github/.instructions/architecture.md](.github/.instructions/architecture.md)
2. [.github/.instructions/testing.md](.github/.instructions/testing.md)
3. [.github/.instructions/code-standards.md](.github/.instructions/code-standards.md)
4. [.github/.instructions/frontend.md](.github/.instructions/frontend.md)
5. [.github/.instructions/backend.md](.github/.instructions/backend.md)
6. [.github/.instructions/docker.md](.github/.instructions/docker.md)
7. [.github/.instructions/security.md](.github/.instructions/security.md)

## Como executar

- Instalar dependências: `npm install`
- Rodar o app localmente: `npm run dev`
- Validar tipagem: `npm run typecheck`
- Rodar lint: `npm run lint`
- Executar smoke tests: `npm test`
- Subir app e PostgreSQL via Docker: `docker compose up --build`

Regras gerais:

- As instruções técnicas devem sempre respeitar [../../docs/business-rules.md](../../docs/business-rules.md), [../../docs/data-model.md](../../docs/data-model.md) e [../../docs/api-contract.md](../../docs/api-contract.md).
- Quando houver conflito entre arquivos, a regra mais específica vence a mais genérica.
- Se um escopo ficar grande ou misturar responsabilidades, ele deve ser dividido antes de implementar.
