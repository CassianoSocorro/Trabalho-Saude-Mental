import knex from "knex";
export const connection = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "arthur5432l",
    database: "trabalhoflavio",
    port: 5432,
  },
});
