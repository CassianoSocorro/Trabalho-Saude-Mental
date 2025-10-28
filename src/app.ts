import express from "express";
import cors from "cors";
import { avaliacaoRouter } from "./routes/AvaliacaoRouter";
import { servicosRouter } from "./routes/ServicosRouter";
import usuarioRouter from "./routes/UsuarioRouter";
import funcionarioRouter from "./routes/FuncionarioRouter";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', avaliacaoRouter); 
app.use('/api', servicosRouter); 
app.use('/api/usuarios', usuarioRouter); 
app.use('/api/funcionarios', funcionarioRouter); 

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
