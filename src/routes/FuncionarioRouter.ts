import { Router } from "express";
import FuncionarioController from "../controller/FuncionarioController";

const router = Router();

router.get("/", FuncionarioController.listarFuncionarios);
router.get("/:id", FuncionarioController.detalharFuncionario);
router.post("/", FuncionarioController.cadastrarFuncionario);
router.put("/:id", FuncionarioController.atualizarFuncionario);
router.delete("/:id", FuncionarioController.removerFuncionario);

export default router;
