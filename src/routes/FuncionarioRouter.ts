import { Router } from "express";
import FuncionarioController from "../controller/FuncionarioController";

const router = Router();

router.get("/", FuncionarioController.listarFuncionarios);
<<<<<<< HEAD
router.get("/:id", FuncionarioController.detalharFuncionario);
router.post("/", FuncionarioController.cadastrarFuncionario);
router.put("/:id", FuncionarioController.atualizarFuncionario);
router.delete("/:id", FuncionarioController.removerFuncionario);

=======
router.get("/:id", FuncionarioController.obterFuncionarioPorId);
router.post("/", FuncionarioController.criarNovoFuncionario);
router.put("/:id", FuncionarioController.atualizarDadosFuncionario);
router.delete("/:id", FuncionarioController.removerFuncionarioPorId);
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
export default router;
