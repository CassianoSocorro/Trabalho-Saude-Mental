import { Router } from "express";
import UsuarioController from "../controller/UsuarioController";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";


const userRouter = Router();

userRouter.get("/", UsuarioController.listarUsuarios);
userRouter.get("/:id", UsuarioController.detalharUsuario);
userRouter.post("/", UsuarioController.cadastrarUsuario);

userRouter.put("/:id",AuthorizationMiddleware.authorizeOwner,UsuarioController.atualizarUsuario);

userRouter.delete("/:id",AuthorizationMiddleware.authorizeOwner,UsuarioController.removerUsuario);

export default userRouter;
