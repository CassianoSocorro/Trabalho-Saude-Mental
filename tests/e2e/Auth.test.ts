import request from "supertest";
import { app } from "../../src/app";
import { connection } from "../../src/dbConnection";
import * as bcrypt from "bcryptjs";

const TEST_EMAIL = "auth.test@example.com";
const TEST_PASSWORD = "password123";
const TEST_TELEFONE = "(00) 0000-0000";
const TEST_NOME = "User Teste Auth";

describe("Auth E2E Tests", () => {
  beforeAll(async () => {
    await connection.raw("SELECT 1");

    await connection("usuarios").truncate();

    const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

    await connection("usuarios").insert({
      nome: TEST_NOME,
      email: TEST_EMAIL,
      senha: passwordHash,
      telefone: TEST_TELEFONE,
    });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("should successfully log in a user with valid credentials", async () => {
    const validCredentials = {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    };

    const response = await request(app)
      .post("/auth/login")
      .send(validCredentials)
      .expect(200);

    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  test("should return 401 for invalid credentials", async () => {
    const invalidCredentials = {
      email: "invalid@example.com",
      password: "wrongpassword",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidCredentials)
      .expect(401);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Credenciais inválidas");
  });
});

test("should successfully log in a user with valid credentials", async () => {
  const validCredentials = {
    email: "andre50@gmail.com",
    password: "clubepe12",
  };

  const response = await request(app)
    .post("/auth/login")
    .send(validCredentials)
    .expect(200);

  expect(response.body).toHaveProperty("token");
  expect(typeof response.body.token).toBe("string");
});

test("should return 401 for invalid credentials", async () => {
  const invalidCredentials = {
    email: "invalid@example.com",
    password: "wrongpassword",
  };

  const response = await request(app)
    .post("/auth/login")
    .send(invalidCredentials)
    .expect(401);

  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toBe("Credenciais inválidas");
});
