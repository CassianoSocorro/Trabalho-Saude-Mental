# Documentação dos Testes da API

Este documento descreve os testes implementados para a API de Saúde Mental e Bem-Estar, detalhando o propósito de cada arquivo de teste e os cenários que eles cobrem.

## Tipos de Testes

No projeto, temos dois tipos principais de testes:

*   **Testes Unitários:** Focam em testar unidades isoladas de código (funções, classes) para garantir que funcionem conforme o esperado.
*   **Testes E2E (End-to-End):** Testam o fluxo completo da aplicação, simulando interações de usuários reais com a API, desde a requisição HTTP até a resposta final, incluindo a interação com o banco de dados e serviços externos.

---

## Arquivos de Teste Traduzidos (Unitários)

Os seguintes arquivos de teste unitários foram traduzidos para português:

### `tests/dbConnection.test.ts`

*   **O que é:** Este arquivo contém testes para verificar a conexão com o banco de dados.
*   **O que faz:** Garante que a aplicação consegue estabelecer uma conexão funcional com o banco de dados e executar operações básicas.
    *   **Cenário:** `deve conectar ao banco de dados` - Verifica se uma consulta SQL simples retorna o resultado esperado, confirmando a conectividade.

### `tests/errorHandler.test.ts`

*   **O que é:** Testa a funcionalidade de tratamento de erros da aplicação.
*   **O que faz:** Verifica se a função `throwErrorIfNegative` (um exemplo de utilitário de tratamento de erros) se comporta corretamente.
    *   **Cenário:** `deve lançar um erro se o número for negativo` - Confirma que um erro é lançado quando um número negativo é fornecido.
    *   **Cenário:** `não deve lançar um erro se o número for positivo` - Garante que nenhum erro é lançado para números positivos.
    *   **Cenário:** `não deve lançar um erro se o número for zero` - Garante que nenhum erro é lançado para o número zero.

### `tests/isEven.test.ts`

*   **O que é:** Testa a função utilitária `isEven` que verifica se um número é par.
*   **O que faz:** Valida o comportamento da função para diferentes tipos de números.
    *   **Cenário:** `deve retornar verdadeiro para um número par` - Testa números pares positivos e zero.
    *   **Cenário:** `deve retornar falso para um número ímpar` - Testa números ímpares positivos.
    *   **Cenário:** `deve retornar verdadeiro para números pares negativos` - Testa números pares negativos.
    *   **Cenário:** `deve retornar falso para números ímpares negativos` - Testa números ímpares negativos.
    *   **Cenário:** `deve retornar falso para números de ponto flutuante` - Garante que números não inteiros são tratados corretamente.

### `tests/stringValidator.test.ts`

*   **O que é:** Testa a função utilitária `isNonEmptyString` que valida se uma entrada é uma string não vazia.
*   **O que faz:** Verifica se a função identifica corretamente strings válidas e inválidas.
    *   **Cenário:** `deve retornar verdadeiro para uma string válida e não vazia` - Testa strings com conteúdo.
    *   **Cenário:** `deve retornar falso para strings vazias ou com apenas espaços em branco` - Testa strings vazias ou com apenas espaços.
    *   **Cenário:** `deve retornar falso para entradas que não são strings (null, undefined, number)` - Testa entradas que não são do tipo string.

### `tests/UBusinessData.test.ts`

*   **O que é:** Testa a integração entre a camada de negócios (`UsuarioBusiness`) e a camada de dados (`UsuarioData`) para as operações de usuário.
*   **O que faz:** Garante que as chamadas entre as camadas funcionam como esperado e que os dados são manipulados corretamente.
    *   **Cenário:** `Deve chamar FindById na camada Data ao detalhar um usuário` - Verifica se a busca por ID no negócio chama a função correta na camada de dados.
    *   **Cenário:** `Deve retornar undefined quando o usuário não for encontrado` - Testa o caso em que um usuário não é encontrado.
    *   **Cenário:** `Deve criar um novo usuário quando o e-mail não existe` - Verifica o fluxo de criação de usuário quando o e-mail é único.
    *   **Cenário:** `Deve retornar erro quando o e-mail já existe` - Testa o cenário de tentativa de cadastro com um e-mail já existente.
    *   **Cenário:** `Deve chamar update e retornar o usuário atualizado` - Garante que a atualização de usuário funciona.
    *   **Cenário:** `Deve retornar verdadeiro quando a remoção ocorre` - Verifica a funcionalidade de exclusão de usuário.

---

## Novos Arquivos de Teste E2E Adicionados

Foram adicionados novos arquivos de teste E2E para cobrir as funcionalidades da API de serviços, garantindo que os fluxos completos da aplicação funcionem corretamente.

### `tests/e2e/Servicos.test.ts`

*   **O que é:** Contém testes de ponta a ponta para as operações CRUD (Criar, Ler, Atualizar, Deletar) da API de serviços.
*   **O que faz:** Simula um usuário (admin) interagindo com os endpoints de serviços.
    *   **Cenário:** `deve criar um novo serviço com sucesso (rota POST /servicos)` - Testa a criação de um serviço, incluindo a obtenção de coordenadas geográficas.
    *   **Cenário:** `deve listar serviços com sucesso (rota GET /servicos)` - Verifica se a listagem de todos os serviços funciona.
    *   **Cenário:** `deve buscar um serviço por ID com sucesso (rota GET /servicos/:id)` - Testa a recuperação de um serviço específico.
    *   **Cenário:** `deve atualizar um serviço existente com sucesso (rota PUT /servicos/:id)` - Verifica a atualização de dados de um serviço.
    *   **Cenário:** `deve deletar um serviço existente com sucesso (rota DELETE /servicos/:id)` - Testa a exclusão de um serviço e verifica se ele não pode mais ser encontrado.

### `tests/e2e/ServicosFilter.test.ts`

*   **O que é:** Contém testes de ponta a ponta para as funcionalidades de filtro da API de serviços.
*   **O que faz:** Garante que os endpoints de listagem de serviços respondam corretamente a diferentes parâmetros de filtro.
    *   **Cenário:** `deve listar serviços filtrados por cidade com sucesso (GET /servicos?cidade=)` - Verifica o filtro por cidade.
    *   **Cenário:** `deve listar serviços filtrados por gratuidade com sucesso (GET /servicos?gratuito=)` - Verifica o filtro por serviços gratuitos.
    *   **Cenário:** `deve listar serviços filtrados por categoria com sucesso (GET /servicos?categoria=)` - Verifica o filtro por categoria de serviço.

### `tests/e2e/ServicosCombinedFilter.test.ts`

*   **O que é:** Contém testes de ponta a ponta para filtros combinados na API de serviços.
*   **O que faz:** Garante que a API lida corretamente com múltiplas condições de filtro simultaneamente.
    *   **Cenário:** `deve listar serviços filtrados por cidade e gratuidade com sucesso` - Testa a combinação de filtros por cidade e gratuidade.
    *   **Cenário:** `deve listar serviços filtrados por cidade e categoria com sucesso` - Testa a combinação de filtros por cidade e categoria.
