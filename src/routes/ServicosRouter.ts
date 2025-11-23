import { Router } from "express";
import { ServicosController } from "../controller/ServicosController";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";


const servicosRouter = Router();
const servicosController = new ServicosController();

servicosRouter.post("/", AuthMiddleware.authenticate, AuthorizationMiddleware.authorizeAdminOnly, servicosController.createServico);
servicosRouter.get("/", servicosController.getServicos);
servicosRouter.get("/:id", servicosController.getServicoById);
servicosRouter.put("/:id", AuthMiddleware.authenticate, AuthorizationMiddleware.authorizeAdminOnly, servicosController.updateServico);
servicosRouter.delete("/:id", AuthMiddleware.authenticate, AuthorizationMiddleware.authorizeAdminOnly, servicosController.deleteServico);

export { servicosRouter };
