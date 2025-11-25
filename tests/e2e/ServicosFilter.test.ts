import request from "supertest";
import { app } from "../../src/app";
import { connection } from "../../src/dbConnection";
import * as bcrypt from "bcryptjs";

const TEST_ADMIN_EMAIL = "admin.filter.test@example.com";
const TEST_ADMIN_PASSWORD = "adminpassword";
const TEST_ADMIN_TELEFONE = "(11) 1111-1111";
const TEST_ADMIN_NOME = "Admin Teste Filtro";
const TEST_ADMIN_ROLE = "admin";

describe("Testes E2E de Filtro de Serviços", () => {
  let adminToken: string;
  let servicoSaoPauloId: number;
  let servicoRioDeJaneiroId: number;

  beforeAll(async () => {
    await connection.raw("SELECT 1");

    await connection("usuarios").where({ email: TEST_ADMIN_EMAIL }).del();
    await connection("servicos").del();

    const passwordHash = await bcrypt.hash(TEST_ADMIN_PASSWORD, 10);

    await connection("usuarios").insert({
      nome: TEST_ADMIN_NOME,
      email: TEST_ADMIN_EMAIL,
      senha: passwordHash,
      telefone: TEST_ADMIN_TELEFONE,
      role: TEST_ADMIN_ROLE,
    });

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ email: TEST_ADMIN_EMAIL, password: TEST_ADMIN_PASSWORD });

    adminToken = loginResponse.body.token;

    const servicoSaoPaulo = {
      nome: "CAPS São Paulo",
      tipo: "Atenção Psicossocial",
      cidade: "São Paulo",
      endereco: "Rua Teste SP, 100",
      telefone: "11111111111",
      gratuito: true,
      categoria: "Saúde Mental",
    };

    const servicoRioDeJaneiro = {
      nome: "UPA Rio",
      tipo: "Urgência",
      cidade: "Rio de Janeiro",
      endereco: "Av. Teste RJ, 200",
      telefone: "21222222222",
      gratuito: false,
      categoria: "Saúde",
    };

    const createSPServicoResponse = await request(app)
      .post("/servicos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(servicoSaoPaulo);
    servicoSaoPauloId = createSPServicoResponse.body.id;

    const createRJServicoResponse = await request(app)
      .post("/servicos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(servicoRioDeJaneiro);
    servicoRioDeJaneiroId = createRJServicoResponse.body.id;
  });

  afterAll(async () => {
    await connection("usuarios").where({ email: TEST_ADMIN_EMAIL }).del();
    await connection("servicos").whereIn("id", [servicoSaoPauloId, servicoRioDeJaneiroId]).del();
    await connection.destroy();
  });

  test("deve listar serviços filtrados por cidade com sucesso (GET /servicos?cidade=)", async () => {
    const response = await request(app)
      .get("/servicos?cidade=São Paulo")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("nome", "CAPS São Paulo");
    expect(response.body[0]).toHaveProperty("cidade", "São Paulo");
  });

  test("deve listar serviços filtrados por gratuidade com sucesso (GET /servicos?gratuito=)", async () => {
    const response = await request(app)
      .get("/servicos?gratuito=true")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("nome", "CAPS São Paulo");
    expect(response.body[0]).toHaveProperty("gratuito", true);
  });

  test("deve listar serviços filtrados por categoria com sucesso (GET /servicos?categoria=)", async () => {
    const response = await request(app)
      .get("/servicos?categoria=Saúde Mental")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("nome", "CAPS São Paulo");
    expect(response.body[0]).toHaveProperty("categoria", "Saúde Mental");
  });
});
