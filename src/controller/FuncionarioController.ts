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
  async criarNovoFuncionario(req: Request, res: Response): Promise<Response> {
    const { nome, cargo, email, data_admissao } = req.body;

    if (!nome || !cargo || !email || !data_admissao) {
      return res
        .status(400)
        .send({
          message: "Campos obrigatórios: nome, cargo, email e data_admissao.",
        });
    }

    try {
      const resultado = await FuncionarioBusiness.cadastrar(req.body);

      if (resultado && "error" in resultado) {
        return res.status(409).send({ message: resultado.error });
      }

      return res.status(201).json(resultado);
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      return res
        .status(500)
        .send({ message: "Erro interno ao cadastrar funcionário." });
    }
  }

  async atualizarDadosFuncionario(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id as string, 10);
    const dadosParaAtualizar = req.body;

    if (Object.keys(dadosParaAtualizar).length === 0) {
      return res
        .status(400)
        .send({ message: "Nenhum dado fornecido para atualização." });
    }

    try {
      const funcionarioAtualizado = await FuncionarioBusiness.atualizar(
        id,
        dadosParaAtualizar
      );

      if (!funcionarioAtualizado) {
        return res
          .status(404)
          .send({ message: "Funcionário não encontrado para atualização." });
      }
      return res.json(funcionarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      return res
        .status(500)
        .send({ message: "Erro interno ao atualizar funcionário." });
    }
  }

  async removerFuncionarioPorId(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id as string, 10);

    try {
      const removido = await FuncionarioBusiness.remover(id);

      if (!removido) {
        return res
          .status(404)
          .send({ message: "Funcionário não encontrado para exclusão." });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao remover funcionário:", error);
      return res
        .status(500)
        .send({ message: "Erro interno ao remover funcionário." });
    }
  }
}
export default new FuncionarioController();
