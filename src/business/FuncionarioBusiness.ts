import FuncionarioData from "../data/FuncionarioData";
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
    return novoFuncionario as Funcionario;
  }

  async atualizar(
    id: number,
    dados: Partial<Funcionario>
  ): Promise<Funcionario | undefined> {
    const count = await FuncionarioData.update(id, dados);
    if (count === 0) {
      return undefined;
    }
    return this.detalhar(id);
  }

  async remover(id: number): Promise<boolean> {
    const count = await FuncionarioData.remove(id);
    return count > 0;
  }
}
export default new FuncionarioBusiness();
