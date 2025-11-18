import request from "supertest";
import { app } from "../../src/app";
import { connection } from "../../src/dbConnection";

describe("Auth E2E Tests", () => {
  beforeAll(async () => {
    await connection.raw("SELECT 1");
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("should successfully log in a user with valid credentials", async () => {
    const validCredentials = {
      email: "test@example.com",
      password: "password123",
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
});
