import { Request, Response } from 'express';
import { ServicosBusiness } from '../business/ServicosBusiness';
import { Servicos } from '../types/Servicos';

export class ServicosController {
    private servicosBusiness: ServicosBusiness;

    constructor() {
        this.servicosBusiness = new ServicosBusiness();
    }

    createServico = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nome, tipo, cidade, endereco, telefone, gratuito, categoria } = req.body;
            const servico: Servicos = { nome, tipo, cidade, endereco, telefone, gratuito, categoria };
            const newServico = await this.servicosBusiness.createServico(servico);
            res.status(201).send(newServico);
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    getServicos = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cidade, gratuito, categoria } = req.query;
            const servicos = await this.servicosBusiness.getServicos(
                cidade as string,
                gratuito ? (gratuito === 'true') : undefined,
                categoria as string
            );
            res.status(200).send(servicos);
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    getServicoById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const servico = await this.servicosBusiness.getServicoById(id);
            if (servico) {
                res.status(200).send(servico);
            } else {
                res.status(404).send({ message: 'Serviço não encontrado.' });
            }
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    updateServico = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { nome, tipo, cidade, endereco, telefone, gratuito, categoria } = req.body;
            const servico: Partial<Servicos> = { nome, tipo, cidade, endereco, telefone, gratuito, categoria };
            const updatedServico = await this.servicosBusiness.updateServico(id, servico);
            if (updatedServico) {
                res.status(200).send(updatedServico);
            } else {
                res.status(404).send({ message: 'Serviço não encontrado.' });
            }
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    deleteServico = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const success = await this.servicosBusiness.deleteServico(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send({ message: 'Serviço não encontrado.' });
            }
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
}
