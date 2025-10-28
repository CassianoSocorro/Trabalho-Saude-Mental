import FuncionarioData from "../data/FuncionarioData";
<<<<<<< HEAD
import { Funcionario } from "../types/Funcionario";

class FuncionarioBusiness {
  async detalhar(id: number): Promise<Funcionario | undefined> {
    const funcionario = await FuncionarioData.findById(id);
    if (!funcionario) {
      return undefined;
    }
    return funcionario as Funcionario;
  }

  async listar(): Promise<Funcionario[]> {
    const funcionarios = await FuncionarioData.findAll();
    return funcionarios as Funcionario[];
  }

  async cadastrar(
    dados: Funcionario
  ): Promise<Funcionario | { error: string } | undefined> {
    if (!dados.nome || !dados.cargo || !dados.email || !dados.senha) {
      throw new Error("Nome, cargo, email e senha são obrigatórios.");
    }

    const funcionarioExistente = await FuncionarioData.findByEmail(dados.email);
    if (funcionarioExistente) {
      return { error: "E-mail já cadastrado." };
    }

    const dataAdmissao = dados.data_admissao ? new Date(dados.data_admissao) : undefined;

    const dadosParaCriar = {
      ...dados,
      senha: dados.senha,
      data_admissao: dataAdmissao
    };

    const novoFuncionario = await FuncionarioData.create(dadosParaCriar);
=======
import { Funcionario, FuncionarioInput } from "../types/Funcionario";

class FuncionarioBusiness {
  async obterPorId(id: number): Promise<Funcionario | undefined> {
    const funcionario = await FuncionarioData.findById(id);
    return funcionario as Funcionario;
  }

  async listar(query: any): Promise<Funcionario[]> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const filters = {
      nome: query.nome as string,
      cargo: query.cargo as string,
      email: query.email as string,
      sort_by: query.sort_by as string,
      order: query.order as "asc" | "desc",
      limit: limit,
      offset: offset,
    };
    const funcionarios = await FuncionarioData.findAllWithFilters(filters);

    return funcionarios as Funcionario[];
  }
  async cadastrar(
    dados: FuncionarioInput
  ): Promise<Funcionario | { error: string } | undefined> {
    const funcionarioExistente = await FuncionarioData.findByEmail(dados.email);
    if (funcionarioExistente) {
      return { error: "E-mail de funcionário já cadastrado." };
    }

    const dadosParaCriar: FuncionarioInput = {
      ...dados,
      data_admissao: dados.data_admissao ? dados.data_admissao : new Date(),
    };

    const novoFuncionario = await FuncionarioData.create(
      dadosParaCriar as Omit<Funcionario, "id">
    );

>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
    return novoFuncionario as Funcionario;
  }

  async atualizar(
    id: number,
<<<<<<< HEAD
    dados: Partial<Funcionario>
  ): Promise<Funcionario | undefined> {
    const count = await FuncionarioData.update(id, dados);
    if (count === 0) {
      return undefined;
    }
    return this.detalhar(id);
=======
    dados: Partial<FuncionarioInput>
  ): Promise<Funcionario | undefined> {
    const dadosParaAtualizar = dados;

    const count = await FuncionarioData.update(
      id,
      dadosParaAtualizar as Partial<Funcionario>
    );
    if (count === 0) {
      return undefined;
    }

    return this.obterPorId(id);
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
  }

  async remover(id: number): Promise<boolean> {
    const count = await FuncionarioData.remove(id);
    return count > 0;
  }
}
<<<<<<< HEAD

=======
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
export default new FuncionarioBusiness();
