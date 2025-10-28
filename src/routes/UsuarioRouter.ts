import { Router } from "express";
import UsuarioController from "../controller/UsuarioController";

const router = Router();

router.get("/:id", UsuarioController.detalharUsuario);
router.post("/", UsuarioController.cadastrarUsuario);
router.put("/:id", UsuarioController.atualizarUsuario);
router.delete("/:id", UsuarioController.removerUsuario);
router.get("/", UsuarioController.listarUsuarios);

export default router;
