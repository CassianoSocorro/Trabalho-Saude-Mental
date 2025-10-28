import FuncionarioData from "../data/FuncionarioData";
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

    return novoFuncionario as Funcionario;
  }

  async atualizar(
    id: number,
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
  }

  async remover(id: number): Promise<boolean> {
    const count = await FuncionarioData.remove(id);
    return count > 0;
  }
}
export default new FuncionarioBusiness();
