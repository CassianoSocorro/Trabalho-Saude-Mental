import { Router } from "express";
import FuncionarioController from "../controller/FuncionarioController";

const router = Router();

router.get("/", FuncionarioController.listarFuncionarios);
router.get("/:id", FuncionarioController.obterFuncionarioPorId);
router.post("/", FuncionarioController.criarNovoFuncionario);
router.put("/:id", FuncionarioController.atualizarDadosFuncionario);
router.delete("/:id", FuncionarioController.removerFuncionarioPorId);
export default router;
