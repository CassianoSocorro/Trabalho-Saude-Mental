import { Router } from 'express';
import { ServicosController } from '../controller/ServicosController';

const servicosRouter = Router();
const servicosController = new ServicosController();

servicosRouter.post('/servicos', servicosController.createServico);
servicosRouter.get('/servicos', servicosController.getServicos);
servicosRouter.get('/servicos/:id', servicosController.getServicoById);
servicosRouter.put('/servicos/:id', servicosController.updateServico);
servicosRouter.delete('/servicos/:id', servicosController.deleteServico);

export { servicosRouter };
