import { app } from "./app";
import usuarioRouter from "./routes/UsuarioRouter";

app.use("/usuarios", usuarioRouter);
