# Modelo de Dados

## 1. Visão geral

O modelo relacional armazena usuários, coleções, figurinhas, trocas e itens de troca.

A entidade de álbum não existe no banco de dados. O vínculo com o álbum é feito por um identificador textual que referencia a chave do JSON do catálogo.

## 2. Entidades

### User

Campos principais:

- `id`
- `name`
- `email`
- `password_hash`

Regras:

- Não armazena latitude e longitude.
- Possui relacionamento um-para-muitos com Collection.

### Collection

Campos principais:

- `id`
- `user_id`
- `album_id`

Regras:

- Pertence a um único usuário.
- `album_id` deve apontar para uma chave válida do catálogo JSON.
- Uma coleção representa o progresso de um usuário em um álbum específico.

### Sticker

Campos principais:

- `id`
- `collection_id`
- `code`
- `status`

Status permitidos:

- `GOT`
- `NEED`
- `DUP`

Regras:

- Pertence a uma única coleção.
- `code` deve existir no catálogo do álbum vinculado à coleção.
- O status deve ser consistente com o estado exibido na UI.

### Trade

Campos principais:

- `id`
- `sender_id`
- `receiver_id`
- `album_id`
- `status`

Status permitidos:

- `PENDING`
- `ACCEPTED`
- `REJECTED`

Regras:

- Liga dois usuários.
- Deve sempre referenciar um álbum.
- O status define o andamento da negociação.

### Trade_Cards

Campos principais:

- `id`
- `trade_id`
- `sticker_code`
- `owner_id`

Regras:

- Pertence a uma trade.
- `sticker_code` identifica a figurinha negociada.
- `owner_id` indica quem está entregando a figurinha.

## 3. Cardinalidades

- User 1:N Collection
- Collection 1:N Sticker
- User 1:N Trade como remetente
- User 1:N Trade como destinatário
- Trade 1:N Trade_Cards

## 4. Integridade de domínio

- Um usuário não deve ter duas coleções do mesmo álbum sem necessidade explícita de regra futura.
- Um sticker deve apontar para uma coleção existente.
- Uma trade deve ter pelo menos um item de troca associado.
- Os códigos de figurinhas devem seguir o padrão definido no catálogo do álbum.

## 5. Observações de implementação

O catálogo permanece fora do banco. Por isso, as regras de validação de `album_id` e `sticker.code` dependem da leitura do JSON em tempo de execução ou em camada de serviço.