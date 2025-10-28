import { Router } from "express";
import FuncionarioController from "../controller/FuncionarioController";

const router = Router();

router.get("/", FuncionarioController.listarFuncionarios);
router.get("/:id", FuncionarioController.obterFuncionarioPorId);

export default router;
