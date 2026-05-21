# TrocaAi

Documentação inicial do produto e das regras de negócio:

- [Visão geral e regras de negócio](docs/business-rules.md)
- [Modelo de dados](docs/data-model.md)
- [Contrato da API](docs/api-contract.md)


## Instruções Técnicas do TrocaAi

Também temos o conjunto de regras técnicas para orientar a implementação do projeto.

Ordem de leitura:

1. [architecture.md](architecture.md)
2. [code-standards.md](code-standards.md)
3. [frontend.md](frontend.md)
4. [backend.md](backend.md)
5. [docker.md](docker.md)
6. [security.md](security.md)

Regras gerais:

- As instruções técnicas devem sempre respeitar [../../docs/business-rules.md](../../docs/business-rules.md), [../../docs/data-model.md](../../docs/data-model.md) e [../../docs/api-contract.md](../../docs/api-contract.md).
- Quando houver conflito entre arquivos, a regra mais específica vence a mais genérica.
- Se um escopo ficar grande ou misturar responsabilidades, ele deve ser dividido antes de implementar.
