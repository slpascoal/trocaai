# Visão Geral e Regras de Negócio

## 1. Contexto do sistema

TrocaAi é uma plataforma web/mobile para colecionadores gerenciarem álbuns físicos, registrarem suas figurinhas e realizarem trocas com outros usuários.

A mecânica principal é baseada em três pilares:

- O catálogo estrutural dos álbuns é estático e vive em um JSON local na aplicação.
- O usuário interage com a coleção marcando o que tem, o que falta e o que está duplicado.
- A localização do usuário não é persistida no banco; ela é capturada em tempo real pelo frontend para localizar colecionadores ativos próximos.

## 2. Objetivo do produto

O sistema deve permitir que o usuário:

- Consulte os álbuns disponíveis.
- Acompanhe o progresso de uma coleção.
- Atualize o status das figurinhas de cada álbum.
- Encontre possíveis parceiros de troca com base em proximidade geográfica e compatibilidade de figurinha.
- Formalize trocas entre dois usuários.

## 3. Premissas de negócio

- O catálogo dos álbuns não é editável pelo usuário final.
- O álbum é identificado no banco por uma chave textual que referencia diretamente o JSON.
- O sistema não armazena latitude e longitude permanentes no PostgreSQL.
- A presença do usuário em uma região é efêmera e expira após um período de inatividade.
- As trocas dependem de compatibilidade entre figurinhas desejadas e duplicadas por usuários diferentes.

## 4. Regras de catálogo

O arquivo `albums_catalog.json` é a fonte de verdade para a estrutura dos álbuns.

Cada álbum contém:

- `id`: identificador único do álbum.
- `name`: nome amigável do álbum.
- `total_stickers`: quantidade total de figurinhas do álbum.
- `sections`: lista de blocos de figurinhas.

Cada seção contém:

- `name`: nome da seção.
- `prefix`: prefixo do código das figurinhas.
- `start_number`: número inicial da faixa.
- `end_number`: número final da faixa.

Regras de validação:

- O `id` deve ser único em todo o catálogo.
- O intervalo `start_number` e `end_number` deve ser coerente.
- O código final da figurinha deve ser derivado do prefixo mais o número formatado.
- A soma das figurinhas previstas nas seções deve ser compatível com `total_stickers`.

## 5. Regras de coleção

Uma coleção pertence a um usuário e a um álbum específico.

O progresso da coleção é montado a partir da estrutura do JSON, não de um cadastro manual de álbum no banco.

Cada figurinha da coleção deve ter um status válido:

- `GOT`: o usuário possui a figurinha.
- `NEED`: o usuário precisa da figurinha.
- `DUP`: o usuário possui figurinha duplicada para troca.

Regras:

- Cada código de figurinha deve existir no catálogo do álbum correspondente.
- Um mesmo código não deve ter múltiplos estados conflitantes na mesma coleção.
- O progresso exibido deve refletir o catálogo vigente do álbum.

## 6. Regras de match

O motor de match deve usar localização efêmera para identificar possíveis parceiros de troca.

Fluxo esperado:

- O frontend envia latitude e longitude no momento do uso.
- O backend registra a posição em cache com tempo de vida limitado.
- O sistema busca usuários ativos dentro do raio solicitado.
- Entre os candidatos, o sistema cruza figurinhas para encontrar complementaridade.

Critério de compatibilidade:

- Figurinhas `NEED` do Usuário A devem existir como `DUP` no Usuário B.
- Figurinhas `NEED` do Usuário B devem existir como `DUP` no Usuário A.

O resultado do match deve indicar quais códigos exatos têm potencial de troca.

## 7. Regras de trade

Uma trade representa uma negociação entre dois usuários.

Regras:

- A trade deve referenciar um remetente e um destinatário.
- A trade deve estar vinculada a um álbum.
- O status da trade deve refletir seu ciclo de vida.
- Os itens da trade devem declarar quem entrega cada figurinha.

Status permitidos:

- `PENDING`
- `ACCEPTED`
- `REJECTED`

## 8. Limites de escopo

Ficam fora do escopo imediato desta documentação:

- Estratégia visual da interface.
- Regras de autenticação detalhadas.
- Moderação ou bloqueio entre usuários.
- Regras de transporte físico das figurinhas.

## 9. Decisões consolidadas

- O catálogo de álbuns será JSON estático.
- A localização do usuário será tratada como dado efêmero.
- O banco terá apenas os dados relacionais necessários para coleção, stickers, trades e usuários.
- A implementação futura em Next.js deve consumir estes contratos sem alterar o modelo de negócio base.