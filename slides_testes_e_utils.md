# Testes Automatizados e Funções Utilitárias com TypeScript

## Sumário
*   Introdução aos Testes Automatizados
*   Configuração do Ambiente de Testes (Jest)
*   Testes Unitários
*   Testes de Funções Assíncronas
*   Testes de Erros
*   Testes E2E (End-to-End)
*   Conclusão

---

## Introdução aos Testes Automatizados

*   **O que são?** Rotinas automatizadas que garantem o funcionamento de sistemas, rodando rapidamente e sem custos humanos.
*   **Por que usar?** Sistemas grandes são frágeis; testes automatizados reduzem a chance de regressões e garantem a qualidade do código.
*   **Tipos de Testes:**
    *   **Unitários:** Validam uma parte isolada da aplicação (função, classe).
    *   **De Integração:** Verificam a comunicação entre diferentes partes do sistema.
    *   **E2E (End-to-End):** Validam um fluxo completo da aplicação, do início ao fim (ex: requisição HTTP completa).
*   **Cobertura de Testes:** Mede quanto do projeto está sendo testado. Focar em pontos críticos é uma boa prática.

---

## Configuração do Ambiente de Testes (Jest)

Para usar o Jest com TypeScript, precisamos das seguintes dependências:
*   `jest`: O framework de testes.
*   `@types/jest`: Tipagens para o Jest.
*   `ts-jest`: Um pré-processador para Jest que permite usar TypeScript.
*   `supertest`: Biblioteca para testar APIs HTTP (usada em testes E2E).
*   `@types/supertest`: Tipagens para o Supertest.

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### `jest.config.js`
Arquivo de configuração do Jest na raiz do projeto:
```javascript
module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
     "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
```
*   `roots`: Indica onde o Jest deve procurar pelos arquivos de teste.
*   `transform`: Configura o `ts-jest` para processar arquivos TypeScript.
*   `testRegex`: Define o padrão de nome para os arquivos de teste.

### `package.json`
Adicionamos um script para rodar os testes:
```json
"scripts": {
  "test": "jest",
  "dev": "tsnd src/index.ts",
  "migrate": "knex migrate:latest --knexfile knexfile.ts"
},
```

### `tsconfig.json`
Atualizamos o `tsconfig.json` para incluir a pasta `tests` e ajustar o `rootDir`:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./", // Aponta para a raiz do projeto
    "strict": true,
    "sourceMap": true,
    "outDir": "./build",
    "removeComments": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"], // Inclui arquivos de teste
  "exclude": ["node_modules"]
}
```

---

## Testes Unitários

Testes unitários focam em validar pequenas partes isoladas do código.

### Exemplo: Função `isEven`
*   **`src/utils/isEven.ts`**:
    ```typescript
    export const isEven = (n: number): boolean => {
      return n % 2 === 0;
    };
    ```
*   **`tests/isEven.test.ts`**:
    ```typescript
    import { isEven } from '../src/utils/isEven';

    describe('isEven', () => {
      test('should return true for an even number', () => {
        expect(isEven(2)).toBe(true);
        expect(isEven(0)).toBe(true);
      });

      test('should return false for an odd number', () => {
        expect(isEven(1)).toBe(false);
        expect(isEven(3)).toBe(false);
      });
    });
    ```
    *   `describe`: Agrupa um conjunto de testes relacionados.
    *   `test`: Define um caso de teste individual.
    *   `expect`: Inicia uma asserção.
    *   `.toBe()`: Verifica igualdade estrita (para valores primitivos).

### Exemplo: Função `isNonEmptyString` (Adição do Usuário)
*   **`src/utils/stringValidator.ts`**:
    ```typescript
    export const isNonEmptyString = (input: unknown): boolean => {
      return typeof input === "string" && input.trim().length > 0;
    };
    ```
*   **`tests/e2e/stringValidator.test.ts`**: (Observação: Este teste é unitário, apesar de estar na pasta `e2e`)
    ```typescript
    import { isNonEmptyString } from "../src/utils/stringValidator";

    describe("isNonEmptyString Validation", () => {
      test("should return true for a valid, non-empty string", () => {
        expect(isNonEmptyString("Sessão de Terapia")).toBe(true);
      });

      test("should return false for empty strings or strings with only whitespace", () => {
        expect(isNonEmptyString("")).toBe(false);
        expect(isNonEmptyString("   ")).toBe(false);
      });

      test("should return false for non-string inputs", () => {
        expect(isNonEmptyString(null)).toBe(false);
        expect(isNonEmptyString(undefined)).toBe(false);
      });
    });
    ```
    *   Demonstra a validação de strings, cobrindo casos de sucesso, strings vazias/espaços e tipos de dados incorretos.

---

## Testes de Funções Assíncronas

Para testar funções que retornam Promises (como operações de banco de dados), usamos `async/await`.

### Exemplo: Conexão com o Banco de Dados
*   **`src/dbConnection.ts`**:
    ```typescript
    import knex from "knex";
    import dotenv from "dotenv";

    dotenv.config();
    export const connection = knex({
      client: "pg",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
      },
    });
    ```
*   **`tests/dbConnection.test.ts`**:
    ```typescript
    import { connection } from '../src/dbConnection';

    describe('async & error handling', () => {
      test('should connect to the database', async () => {
        const [tables] = await connection.raw('SHOW TABLES');
        expect(tables).toBeDefined();
        expect(Array.isArray(tables)).toBe(true);
      });

      afterAll(async () => {
        await connection.destroy(); // Garante que a conexão é fechada após os testes
      });
    });
    ```
    *   `async/await`: Permite esperar a resolução de Promises.
    *   `afterAll`: Executa uma função após todos os testes de um `describe` terem sido concluídos, ideal para limpeza de recursos.
    *   **Observação:** Este teste requer que as variáveis de ambiente do banco de dados (`.env`) estejam configuradas corretamente para funcionar.

---

## Testes de Erros

Testamos se uma função lança um erro esperado em determinadas condições.

### Exemplo: Função `throwErrorIfNegative`
*   **`src/utils/errorHandler.ts`**:
    ```typescript
    export const throwErrorIfNegative = (num: number): number => {
      if (num < 0) {
        throw new Error("Número não pode ser negativo.");
      }
      return num;
    };
    ```
*   **`tests/errorHandler.test.ts`**:
    ```typescript
    import { throwErrorIfNegative } from '../src/utils/errorHandler';

    describe('error handling', () => {
      test('should throw an error if the number is negative', () => {
        expect(() => throwErrorIfNegative(-1)).toThrow('Número não pode ser negativo.');
      });

      test('should not throw an error if the number is positive', () => {
        expect(throwErrorIfNegative(1)).toBe(1);
      });
    });
    ```
    *   `expect(() => ...).toThrow()`: Verifica se uma função lança um erro com uma mensagem específica.

---

## Testes E2E (End-to-End)

Testes E2E simulam um fluxo completo do usuário na aplicação, interagindo com a API.

### Exemplo: Rota de Login
*   **`src/app.ts`**: A instância do Express (`app`) é exportada e o `authRouter` é adicionado.
    ```typescript
    // ...
    import { authRouter } from "./routes/AuthRouter";
    // ...
    export const app = express();
    // ...
    app.use("/auth", authRouter);
    ```
*   **`src/routes/AuthRouter.ts`**: Define a rota `/login`.
    ```typescript
    import express from 'express';
    import { AuthController } from '../controller/AuthController';

    export const authRouter = express.Router();
    const authController = new AuthController();
    authRouter.post('/login', authController.login);
    ```
*   **`tests/e2e/Auth.test.ts`**:
    ```typescript
    import request from 'supertest';
    import { app } from '../../src/app';
    import { connection } from '../../src/dbConnection';

    describe('Auth E2E Tests', () => {
      beforeAll(async () => {
        // Configuração do DB para testes (ex: criar usuário de teste)
        await connection.raw('SELECT 1');
      });

      afterAll(async () => {
        await connection.destroy(); // Fechar conexão do DB
      });

      test('should successfully log in a user with valid credentials', async () => {
        const validCredentials = { email: 'test@example.com', password: 'password123' };
        const response = await request(app)
          .post('/auth/login')
          .send(validCredentials)
          .expect(200); // Espera status 200
        expect(response.body).toHaveProperty('token');
      });

      test('should return 401 for invalid credentials', async () => {
        const invalidCredentials = { email: 'invalid@example.com', password: 'wrongpassword' };
        const response = await request(app)
          .post('/auth/login')
          .send(invalidCredentials)
          .expect(401); // Espera status 401
        expect(response.body).toHaveProperty('message');
      });
    });
    ```
    *   `supertest`: Permite fazer requisições HTTP para a aplicação Express.
    *   `beforeAll`: Executa uma função antes de todos os testes de um `describe`, ideal para configurar o ambiente.
    *   `.post('/auth/login').send(data)`: Simula uma requisição POST com um corpo.
    *   `.expect(status)`: Verifica o status HTTP da resposta.
    *   **Observação:** Para que este teste funcione, o servidor da aplicação precisa estar rodando e o banco de dados configurado com usuários válidos.

---

## Conclusão

A implementação de testes automatizados é fundamental para garantir a robustez e a manutenibilidade de aplicações. Cobrimos a configuração do ambiente com Jest, a escrita de testes unitários, assíncronos, de erros e E2E, fornecendo uma base sólida para o desenvolvimento de software de qualidade. Lembre-se de sempre manter suas variáveis de ambiente configuradas corretamente para testes que dependem de recursos externos como bancos de dados.
