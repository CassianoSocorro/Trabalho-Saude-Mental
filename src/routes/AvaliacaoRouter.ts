import { Router } from "express";
import { AvaliacaoController } from "../controller/AvaliacaoController";

const avaliacaoRouter = Router();
const avaliacaoController = new AvaliacaoController();

avaliacaoRouter.post("/", avaliacaoController.createAvaliacao);
avaliacaoRouter.get(
  "/:servico_id",
  avaliacaoController.getAvaliacoesByServicoId
);
avaliacaoRouter.put("/:id", avaliacaoController.updateAvaliacao);
avaliacaoRouter.delete("/:id", avaliacaoController.deleteAvaliacao);
avaliacaoRouter.get("/", avaliacaoController.getAvaliacoes);

export { avaliacaoRouter };
