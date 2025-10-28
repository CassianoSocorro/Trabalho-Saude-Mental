import { Request, Response } from "express";
import FuncionarioBusiness from "../business/FuncionarioBusiness";

class FuncionarioController {
  async listarFuncionarios(req: Request, res: Response): Promise<Response> {
    const queryParams = req.query;
    try {
      const funcionarios = await FuncionarioBusiness.listar(queryParams);
      return res.json(funcionarios);
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      return res
        .status(500)
        .send({ message: "Erro interno ao listar funcionários." });
    }
  }

  async obterFuncionarioPorId(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id as string, 10);
    try {
      const funcionario = await FuncionarioBusiness.obterPorId(id);
      if (!funcionario) {
        return res.status(404).send({ message: "Funcionário não encontrado." });
      }
      return res.json(funcionario);
    } catch (error) {
      console.error("Erro ao obter funcionário por ID:", error);
      return res
        .status(500)
        .send({ message: "Erro interno ao buscar funcionário." });
    }
  }
}
export default new FuncionarioController();
