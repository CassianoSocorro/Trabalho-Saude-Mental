import { app } from "./app";
import usuarioRouter from "./routes/UsuarioRouter";
import funcionarioRouter from "./routes/FuncionarioRouter";

app.use("/usuarios", usuarioRouter);
app.use("/funcionarios", funcionarioRouter);
