import { Request, Response } from "express";
import FuncionarioBusiness from "../business/FuncionarioBusiness";
<<<<<<< HEAD
import { Funcionario } from "../types/Funcionario";

class FuncionarioController {
  async listarFuncionarios(req: Request, res: Response): Promise<void> {
    try {
      const funcionarios = await FuncionarioBusiness.listar();
      res.status(200).json(funcionarios);
    } catch (error: any) {
      res.status(500).json({ message: "Erro interno ao listar funcionários." });
    }
  }

  async detalharFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const funcionario = await FuncionarioBusiness.detalhar(id);
      if (funcionario) {
        res.status(200).json(funcionario);
      } else {
        res.status(404).json({ message: "Funcionário não encontrado." });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Erro interno ao detalhar funcionário." });
    }
  }

  async cadastrarFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const novoFuncionario: Funcionario = req.body;
      const funcionarioCriado = await FuncionarioBusiness.cadastrar(novoFuncionario);
      res.status(201).json(funcionarioCriado);
    } catch (error: any) {
      res.status(500).json({ message: "Erro interno ao cadastrar funcionário." });
    }
  }

  async atualizarFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const dadosAtualizados: Partial<Funcionario> = req.body;
      const funcionarioAtualizado = await FuncionarioBusiness.atualizar(id, dadosAtualizados);
      if (funcionarioAtualizado) {
        res.status(200).json(funcionarioAtualizado);
      } else {
        res.status(404).json({ message: "Funcionário não encontrado." });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Erro interno ao atualizar funcionário." });
    }
  }

  async removerFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const sucesso = await FuncionarioBusiness.remover(id);
      if (sucesso) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Funcionário não encontrado." });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Erro interno ao remover funcionário." });
    }
  }
}

=======

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
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
export default new FuncionarioController();
