# Contrato da API

## 1. Visão geral

A API deve expor contratos RESTful para catálogo, coleção, match e trades.

## 2. Endpoints

### GET /catalog/albums

Responsabilidade:

- Retornar o conteúdo integral do `albums_catalog.json`.

Resposta esperada:

- Lista ou objeto com todos os álbuns disponíveis no catálogo.

### GET /collections/{album_id}

Responsabilidade:

- Retornar o progresso da coleção do usuário para o álbum informado.
- Montar a estrutura de resposta com base no JSON do catálogo.

Resposta esperada:

- Dados do álbum.
- Seções e códigos de figurinhas.
- Status atual de cada figurinha da coleção.

### POST /collections/{album_id}/stickers

Responsabilidade:

- Atualizar o status das figurinhas da coleção.

Payload esperado:

- Uma lista de objetos contendo `code` e `status`.

Exemplo lógico:

[
  { "code": "BRA01", "status": "DUP" }
]

Regras:

- Cada `code` deve existir no catálogo do álbum.
- Cada `status` deve pertencer ao conjunto permitido.

### GET /matches/{album_id}?lat={y}&lng={x}&radius=10

Responsabilidade:

- Atualizar o cache de localização do usuário atual.
- Buscar matches em tempo real com base em proximidade e compatibilidade de figurinhas.

Entrada:

- `album_id`
- `lat`
- `lng`
- `radius`

Fluxo:

- Salvar a localização atual em cache com TTL.
- Buscar usuários ativos dentro do raio informado.
- Consultar o PostgreSQL apenas para os usuários candidatos.
- Cruzar NEED e DUP para montar os pares compatíveis.

Saída:

- Lista de usuários compatíveis.
- Códigos exatos de figurinhas que formam match.

### POST /trades

Responsabilidade:

- Criar uma trade.
- Inserir os registros correspondentes em Trade_Cards.

Payload esperado:

- Remetente.
- Destinatário.
- Álbum.
- Lista de figurinhas e respectivos donos.

Regras:

- A trade deve persistir com status inicial `PENDING`.
- Os itens da trade devem indicar quem está entregando cada figurinha.

## 3. Regras de resposta

- Erros de validação devem retornar mensagens coerentes com o domínio.
- Requisições com `album_id` inválido devem falhar.
- Figurinhas fora do catálogo não devem ser aceitas.

## 4. Notas de contrato

- O endpoint de match depende de geolocalização efêmera.
- O endpoint de coleção depende do catálogo JSON para reconstruir a estrutura de exibição.
- O endpoint de trades depende de dados consistentes de coleção e compatibilidade de figurinha.