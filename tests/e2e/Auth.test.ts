import request from 'supertest';
import { app } from '../../src/app';
import { connection } from '../../src/dbConnection';

describe('Auth E2E Tests', () => {
  beforeAll(async () => {
    // Limpar o banco de dados ou criar um usuário de teste antes de todos os testes E2E
    // Por simplicidade, vamos apenas garantir que a conexão está ativa.
    // Em um cenário real, você criaria um usuário de teste aqui.
    await connection.raw('SELECT 1'); 
  });

  afterAll(async () => {
    // Limpar dados de teste e fechar a conexão após todos os testes E2E
    await connection.destroy();
  });

  test('should successfully log in a user with valid credentials', async () => {
    // Este é um exemplo. Em um cenário real, você usaria credenciais de um usuário existente no DB.
    const validCredentials = {
      email: 'test@example.com', // Substitua por um email de usuário válido no seu DB
      password: 'password123', // Substitua por uma senha de usuário válida no seu DB
    };

    const response = await request(app)
      .post('/auth/login')
      .send(validCredentials)
      .expect(200); // Espera um status 200 para login bem-sucedido

    expect(response.body).toHaveProperty('token'); // Espera que a resposta contenha um token
    expect(typeof response.body.token).toBe('string');
  });

  test('should return 401 for invalid credentials', async () => {
    const invalidCredentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    const response = await request(app)
      .post('/auth/login')
      .send(invalidCredentials)
      .expect(401); // Espera um status 401 para credenciais inválidas

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Credenciais inválidas'); // Ou a mensagem de erro esperada
  });
});
