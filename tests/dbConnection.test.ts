import { connection } from "../src/dbConnection";

describe("async & error handling", () => {
  test("should connect to the database", async () => {
    const result = await connection.raw("SELECT 1+1 AS result"); 

 expect(result.rows[0].result).toBe(2);  });

  afterAll(async () => {
    await connection.destroy();
  });
});


