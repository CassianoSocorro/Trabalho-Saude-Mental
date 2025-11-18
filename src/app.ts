import express from "express";
import cors from "cors";

import { avaliacaoRouter } from "./routes/AvaliacaoRouter";
import { servicosRouter } from "./routes/ServicosRouter";
import usuarioRouter from "./routes/UsuarioRouter";
import funcionarioRouter from "./routes/FuncionarioRouter";
import { authRouter } from "./routes/AuthRouter"; // Adicionado

import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/avaliacoes", avaliacaoRouter);
app.use("/servicos", servicosRouter);
app.use("/usuarios", usuarioRouter);
app.use("/funcionarios", funcionarioRouter);
app.use("/auth", authRouter); // Adicionado
