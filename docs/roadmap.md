# Roadmap de Implementação do TrocaAi

## Objetivo

Este roadmap organiza a implementação do TrocaAi com base nas regras descritas em `docs/business-rules.md`, `docs/data-model.md` e `docs/api-contract.md`. A prioridade considera dependência técnica, viabilidade de entrega e valor incremental para o produto.

## Critérios de priorização

Cada item abaixo foi classificado com três critérios:

- Viabilidade: o quão claro e implementável o item está com o estado atual do projeto.
- Dependência: o quanto o item destrava outras features.
- Valor de produto: o impacto direto para o usuário final.

## Fase 1: Fundação do domínio

### 1. Catálogo de álbuns

- Status: concluído
- Prioridade: P0
- Viabilidade: alta
- Dependência: nenhuma
- Valor de produto: alto

Por que vem primeiro:

- O catálogo é a fonte de verdade do sistema.
- A lógica de coleção, validação de stickers e respostas da API depende diretamente dele.
- O álbum não existe como entidade relacional; ele é referenciado por chave textual do JSON.

Escopo desta fase:

- Criar ou consolidar `albums_catalog.json` como fonte oficial.
- Implementar leitura e validação do catálogo.
- Validar `id`, `total_stickers` e coerência das seções.

### 2. Estrutura base da coleção

- Prioridade: P0
- Viabilidade: alta
- Dependência: catálogo pronto
- Valor de produto: alto

Por que vem junto do catálogo:

- A coleção é o primeiro fluxo útil do usuário.
- Sem a estrutura do álbum, não é possível montar progresso nem atualizar status de figurinhas.

Escopo desta fase:

- Ler o progresso da coleção por álbum.
- Montar a resposta com base na estrutura do catálogo.
- Validar estados permitidos: `GOT`, `NEED`, `DUP`.

## Fase 2: Núcleo funcional da aplicação

### 3. Atualização de stickers

- Prioridade: P1
- Viabilidade: alta
- Dependência: catálogo e coleção
- Valor de produto: alto

Por que vem cedo:

- É a principal ação de manutenção de coleção.
- Alimenta todas as próximas features, principalmente match e trades.

Escopo desta fase:

- Implementar `POST /collections/{album_id}/stickers`.
- Validar se o `code` existe no catálogo do álbum.
- Garantir consistência entre os status de um mesmo sticker.

### 4. Consulta de catálogo e coleção via API

- Prioridade: P1
- Viabilidade: alta
- Dependência: fundação do domínio
- Valor de produto: alto

Por que vem logo depois:

- Os endpoints REST já estão bem definidos no contrato.
- Essa camada permite criar um ciclo funcional entre catálogo, coleção e UI.

Escopo desta fase:

- Implementar `GET /catalog/albums`.
- Implementar `GET /collections/{album_id}`.
- Padronizar erros de validação para `album_id` inválido e códigos fora do catálogo.

## Fase 3: Match geográfico

### 5. Presença efêmera do usuário

- Prioridade: P2
- Viabilidade: média
- Dependência: coleção consistente
- Valor de produto: alto

Por que vem antes do match completo:

- A localização não é persistida no PostgreSQL.
- O sistema depende de cache com TTL e atualização em tempo real.

Escopo desta fase:

- Receber latitude e longitude no frontend no momento do uso.
- Registrar presença com expiração.
- Definir o contrato de consulta de usuários ativos.

### 6. Motor de match

- Prioridade: P2
- Viabilidade: média
- Dependência: presença efêmera e coleção válida
- Valor de produto: muito alto

Por que fica depois da presença:

- O motor de match depende de raio, atividade recente e compatibilidade entre `NEED` e `DUP`.
- Sem a camada de presença, a feature fica incompleta.

Escopo desta fase:

- Implementar `GET /matches/{album_id}?lat={y}&lng={x}&radius=10`.
- Cruzar figurinhas necessárias e duplicadas entre usuários.
- Retornar os códigos exatos compatíveis para troca.

## Fase 4: Trades

### 7. Criação de trades

- Prioridade: P3
- Viabilidade: média
- Dependência: coleção, match e integridade de usuários/álbum
- Valor de produto: muito alto

Por que vem por último:

- Trade é a abstração mais completa do domínio.
- Depende da consistência de coleção e da validação de compatibilidade entre usuários.

Escopo desta fase:

- Implementar `POST /trades`.
- Persistir a trade com status inicial `PENDING`.
- Persistir itens em `Trade_Cards` com indicação de quem entrega cada figurinha.
- Validar remetente, destinatário e álbum.

### 8. Ciclo de vida de trades

- Prioridade: P3
- Viabilidade: média
- Dependência: criação de trades pronta
- Valor de produto: alto

Por que entra junto da criação:

- O contrato já define os status `PENDING`, `ACCEPTED` e `REJECTED`.
- O fluxo de vida da trade completa o núcleo de negociação.

Escopo desta fase:

- Atualizar status da trade.
- Garantir regras mínimas de integridade entre status e itens da trade.

## Fase 5: Endurecimento e qualidade

### 9. Testes e validações

- Prioridade: P4
- Viabilidade: alta
- Dependência: features principais entregues
- Valor de produto: médio

Escopo desta fase:

- Cobrir regras de catálogo, coleção, match e trade com testes.
- Consolidar mensagens de erro coerentes com o domínio.
- Garantir regressão mínima dos endpoints principais.

### 10. Refinamentos de integração

- Prioridade: P4
- Viabilidade: alta
- Dependência: núcleo funcional estável
- Valor de produto: médio

Escopo desta fase:

- Ajustar contratos de resposta.
- Melhorar consistência entre frontend e backend.
- Preparar a base para evolução futura sem alterar o modelo de negócio.

## Ordem recomendada de execução

1. Catálogo de álbuns.
2. Estrutura base da coleção.
3. Atualização de stickers.
4. Consulta de catálogo e coleção via API.
5. Presença efêmera do usuário.
6. Motor de match.
7. Criação de trades.
8. Ciclo de vida de trades.
9. Testes e validações.
10. Refinamentos de integração.

## Leitura executiva

- O MVP deve começar com catálogo e coleção.
- Match é a primeira grande feature de valor, mas depende da base de coleção estar sólida.
- Trades são a camada mais complexa e devem entrar depois que coleção e match estiverem estáveis.
- Tudo que for visual, de moderação ou de autenticação detalhada fica fora desta primeira onda.