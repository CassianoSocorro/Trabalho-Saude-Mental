import { Router } from "express";
import { AvaliacaoController } from "../controller/AvaliacaoController";

const avaliacaoRouter = Router();
const avaliacaoController = new AvaliacaoController();

avaliacaoRouter.post("/avaliacoes", avaliacaoController.createAvaliacao);
avaliacaoRouter.get("/:servico_id",avaliacaoController.getAvaliacoesByServicoId);
avaliacaoRouter.put("/avaliacoes/:id", avaliacaoController.updateAvaliacao);
avaliacaoRouter.delete("/avaliacoes/:id", avaliacaoController.deleteAvaliacao);

export { avaliacaoRouter };
