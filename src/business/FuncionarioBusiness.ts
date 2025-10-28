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
}
export default new FuncionarioBusiness();
