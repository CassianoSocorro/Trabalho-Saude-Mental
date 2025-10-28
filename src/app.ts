import express from "express";
import cors from "cors";
import { avaliacaoRouter } from "./routes/AvaliacaoRouter";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', avaliacaoRouter); // Adiciona as rotas de avaliação

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
