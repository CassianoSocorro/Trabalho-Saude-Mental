import request from "supertest";
import { app } from "../../src/app";
import { connection } from "../../src/dbConnection";
import * as bcrypt from "bcryptjs";

const TEST_ADMIN_EMAIL = "admin.combined.filter.test@example.com";
const TEST_ADMIN_PASSWORD = "adminpassword";
const TEST_ADMIN_TELEFONE = "(11) 1111-1111";
const TEST_ADMIN_NOME = "Admin Teste Filtro Combinado";
const TEST_ADMIN_ROLE = "admin";

describe("Testes E2E de Filtros Combinados de Serviços", () => {
  let adminToken: string;
  let servicoSPGratuitoSaudeMentalId: number;
  let servicoRJNaoGratuitoSaudeId: number;
  let servicoSPNaoGratuitoSaudeId: number;

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

    const servicoSPGratuitoSaudeMental = {
      nome: "CAPS São Paulo Gratuito",
      tipo: "Atenção Psicossocial",
      cidade: "São Paulo",
      endereco: "Rua Teste SP Gratuito, 100",
      telefone: "11111111111",
      gratuito: true,
      categoria: "Saúde Mental",
    };

    const servicoRJNaoGratuitoSaude = {
      nome: "UPA Rio Não Gratuito",
      tipo: "Urgência",
      cidade: "Rio de Janeiro",
      endereco: "Av. Teste RJ Não Gratuito, 200",
      telefone: "21222222222",
      gratuito: false,
      categoria: "Saúde",
    };

    const servicoSPNaoGratuitoSaude = {
      nome: "Hospital São Paulo Não Gratuito",
      tipo: "Hospital",
      cidade: "São Paulo",
      endereco: "Rua Teste SP Não Gratuito, 300",
      telefone: "11333333333",
      gratuito: false,
      categoria: "Saúde",
    };

    const createSPGratuitoSaudeMentalResponse = await request(app)
      .post("/servicos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(servicoSPGratuitoSaudeMental);
    servicoSPGratuitoSaudeMentalId = createSPGratuitoSaudeMentalResponse.body.id;

    const createRJNaoGratuitoSaudeResponse = await request(app)
      .post("/servicos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(servicoRJNaoGratuitoSaude);
    servicoRJNaoGratuitoSaudeId = createRJNaoGratuitoSaudeResponse.body.id;

    const createSPNaoGratuitoSaudeResponse = await request(app)
      .post("/servicos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(servicoSPNaoGratuitoSaude);
    servicoSPNaoGratuitoSaudeId = createSPNaoGratuitoSaudeResponse.body.id;
  });

  afterAll(async () => {
    await connection("usuarios").where({ email: TEST_ADMIN_EMAIL }).del();
    await connection("servicos").whereIn("id", [
      servicoSPGratuitoSaudeMentalId,
      servicoRJNaoGratuitoSaudeId,
      servicoSPNaoGratuitoSaudeId,
    ]).del();
    await connection.destroy();
  });

  test("deve listar serviços filtrados por cidade e gratuidade com sucesso", async () => {
    const response = await request(app)
      .get("/servicos?cidade=São Paulo&gratuito=true")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("nome", "CAPS São Paulo Gratuito");
    expect(response.body[0]).toHaveProperty("cidade", "São Paulo");
    expect(response.body[0]).toHaveProperty("gratuito", true);
  });

  test("deve listar serviços filtrados por cidade e categoria com sucesso", async () => {
    const response = await request(app)
      .get("/servicos?cidade=São Paulo&categoria=Saúde Mental")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("nome", "CAPS São Paulo Gratuito");
    expect(response.body[0]).toHaveProperty("cidade", "São Paulo");
    expect(response.body[0]).toHaveProperty("categoria", "Saúde Mental");
  });
});
