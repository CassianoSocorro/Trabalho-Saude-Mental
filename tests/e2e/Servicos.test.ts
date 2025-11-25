import request from "supertest";
import { app } from "../../src/app";
import { connection } from "../../src/dbConnection";
import * as bcrypt from "bcryptjs";
import { ServicosData } from "../../src/data/ServicosData";
import { GeoService } from "../../src/services/APIlocalizacao";

const TEST_ADMIN_EMAIL = "admin.test@example.com";
const TEST_ADMIN_PASSWORD = "adminpassword";
const TEST_ADMIN_TELEFONE = "(11) 1111-1111";
const TEST_ADMIN_NOME = "Admin Teste";
const TEST_ADMIN_ROLE = "admin";

describe("Testes E2E de Serviços", () => {
  let adminToken: string;

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
  });

  afterAll(async () => {
    await connection("usuarios").where({ email: TEST_ADMIN_EMAIL }).del();
    await connection("servicos").del();
    await connection.destroy();
  });

  test("deve criar um novo serviço com sucesso (rota POST /servicos)", async () => {
    const novoServico = {
      nome: "UPA Centro",
      tipo: "Urgência",
      cidade: "São Paulo",
      endereco: "Rua da Consolação, 123",
      telefone: "11987654321",
      gratuito: true,
      categoria: "Saúde",
    };

    const response = await request(app)
      .post("/servicos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(novoServico)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe(novoServico.nome);
    expect(response.body).toHaveProperty("latitude");
    expect(response.body).toHaveProperty("longitude");
  });

  test("deve listar serviços com sucesso (rota GET /servicos)", async () => {
    const response = await request(app)
      .get("/servicos")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("nome", "UPA Centro");
  });
});
