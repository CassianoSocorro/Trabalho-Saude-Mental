import { Router } from "express";
import { ServicosController } from "../controller/ServicosController";

const servicosRouter = Router();
const servicosController = new ServicosController();

servicosRouter.post("/", servicosController.createServico);
servicosRouter.get("/", servicosController.getServicos);
servicosRouter.get("/:id", servicosController.getServicoById);
servicosRouter.put("/:id", servicosController.updateServico);
servicosRouter.delete("/:id", servicosController.deleteServico);

export { servicosRouter };
