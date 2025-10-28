# Slide: Endpoints da API de Mapeamento de Recursos de Saúde Mental

## Introdução

Esta API RESTful mapeia recursos de saúde mental e grupos de apoio humanitário. Facilita o acesso a serviços públicos e privados (CAPS, clínicas, psicólogos, ONGs), oferecendo uma base de dados organizada e integrável.

---

## 1. Endpoints de Avaliações (`/api/avaliacoes`)

Gerencia o feedback dos usuários sobre os serviços.

### **POST /api/avaliacoes**
*   **Descrição:** Cadastra uma nova avaliação para um serviço.
*   **Corpo:** `{ servico_id: number, usuario_id: number, nota: number, comentario?: string }`
*   **Observações:** `nota` deve ser entre 1 e 5.

### **GET /api/avaliacoes/:servico_id**
*   **Descrição:** Lista todas as avaliações de um serviço específico.
*   **Parâmetro:** `servico_id` (ID do serviço)

### **PUT /api/avaliacoes/:id**
*   **Descrição:** Atualiza uma avaliação existente.
*   **Parâmetro:** `id` (ID da avaliação)
*   **Corpo:** `{ nota?: number, comentario?: string }`

### **DELETE /api/avaliacoes/:id**
*   **Descrição:** Remove uma avaliação do sistema.
*   **Parâmetro:** `id` (ID da avaliação)

---

## 2. Endpoints de Funcionários (`/api/funcionarios`)

Gerencia o cadastro e consulta de funcionários e voluntários que atuam nos serviços.

### **GET /api/funcionarios**
*   **Descrição:** Lista todos os funcionários e voluntários.

### **GET /api/funcionarios/:id**
*   **Descrição:** Retorna detalhes completos de um funcionário ou voluntário.
*   **Parâmetro:** `id` (ID do funcionário)

### **POST /api/funcionarios**
*   **Descrição:** Cadastra um novo funcionário ou voluntário.
*   **Corpo:** `{ nome, cargo, email, telefone, data_admissao, salario }`

### **PUT /api/funcionarios/:id**
*   **Descrição:** Atualiza dados de um funcionário ou voluntário.
*   **Parâmetro:** `id` (ID do funcionário)
*   **Corpo:** `{ nome?, cargo?, email?, telefone?, data_admissao?, salario? }`

### **DELETE /api/funcionarios/:id**
*   **Descrição:** Remove um funcionário ou voluntário.
*   **Parâmetro:** `id` (ID do funcionário)

---

## 3. Endpoints de Serviços (`/api/servicos`)

Gerencia o cadastro, consulta e filtragem de serviços de saúde mental e grupos de apoio.

### **GET /api/servicos**
*   **Descrição:** Lista todos os serviços, com filtros opcionais por `cidade`, `gratuito` e `categoria`.
*   **Query Params:** `?cidade=muriae&gratuito=true&categoria=terapia`

### **GET /api/servicos/:id**
*   **Descrição:** Retorna os detalhes de um serviço específico.
*   **Parâmetro:** `id` (ID do serviço)

### **POST /api/servicos**
*   **Descrição:** Cadastra um novo serviço (CAPS, clínica, grupo etc.).
*   **Corpo:** `{ nome, tipo, cidade, endereço, telefone, gratuito, categoria }`

### **PUT /api/servicos/:id**
*   **Descrição:** Atualiza informações de um serviço existente.
*   **Parâmetro:** `id` (ID do serviço)
*   **Corpo:** `{ nome?, tipo?, cidade?, telefone?, gratuito?, categoria? }`

### **DELETE /api/servicos/:id**
*   **Descrição:** Remove um serviço do sistema.
*   **Parâmetro:** `id` (ID do serviço)

---

## 4. Endpoints de Usuários (`/api/usuarios`)

Gerencia o cadastro e as informações dos usuários (pacientes) da plataforma.

### **GET /api/usuarios**
*   **Descrição:** Lista todos os usuários cadastrados.

### **GET /api/usuarios/:id**
*   **Descrição:** Retorna os detalhes de um usuário específico.
*   **Parâmetro:** `id` (ID do usuário)

### **POST /api/usuarios**
*   **Descrição:** Cadastra um novo usuário (paciente).
*   **Corpo:** `{ nome, email, senha, data_cadastro }`

### **PUT /api/usuarios/:id**
*   **Descrição:** Atualiza informações de um usuário existente.
*   **Parâmetro:** `id` (ID do usuário)
*   **Corpo:** `{ nome?, email?, senha?, data_cadastro? }`

### **DELETE /api/usuarios/:id**
*   **Descrição:** Remove um usuário do sistema.
*   **Parâmetro:** `id` (ID do usuário)

---

## Conclusão

API robusta e bem estruturada para o gerenciamento de recursos de saúde mental, com endpoints claros e seguindo as melhores práticas RESTful.
