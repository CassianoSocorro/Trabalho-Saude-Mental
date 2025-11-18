import { connection } from "../src/dbConnection";

describe("async & error handling", () => {
  test("should connect to the database", async () => {
    const [tables] = await connection.raw("SHOW TABLES");
    expect(tables).toBeDefined();
    expect(Array.isArray(tables)).toBe(true);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
