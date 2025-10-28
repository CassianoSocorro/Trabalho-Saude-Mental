import { connection as db } from "../dbConnection";
import { Funcionario } from "../types/Funcionario";

interface FuncionarioListFilters {
  nome?: string;
  email?: string;
  telefone?: string;
  sort_by?: string;
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

type FuncionarioDB = Omit<Funcionario, "id"> & { id: number };

class FuncionarioData {
  private tableName = "funcionarios";

  async findById(id: number): Promise<FuncionarioDB | undefined> {
    return db(this.tableName).where({ id }).select("*").first();
  }

  async findByEmail(email: string): Promise<FuncionarioDB | undefined> {
    return db(this.tableName).where({ email }).first();
  }

  async create(
    dados: Omit<Funcionario, "id">
  ): Promise<FuncionarioDB> {
    const [novoFuncionario] = await db(this.tableName).insert({
      ...dados,
      data_admissao: dados.data_admissao || new Date(),
    }).returning('*');

    return novoFuncionario;
  }

  async update(
    id: number,
    dados: Partial<Omit<Funcionario, "id">>
  ): Promise<number> {
    return db(this.tableName).where({ id }).update(dados);
  }

  async remove(id: number): Promise<number> {
    return db(this.tableName).where({ id }).del();
  }

  async findAll(filters?: FuncionarioListFilters): Promise<FuncionarioDB[]> {
    let query = db(this.tableName).select("*");

    if (filters?.nome) {
      query = query.where("nome", "like", `%${filters.nome}%`);
    }
    if (filters?.email) {
      query = query.where("email", "like", `%${filters.email}%`);
    }
    if (filters?.telefone) {
      query = query.where("telefone", "like", `%${filters.telefone}%`);
    }

    const sortColumn = filters?.sort_by || "id";
    const sortOrder = filters?.order || "asc";
    query = query.orderBy(sortColumn, sortOrder);

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    return query as Promise<FuncionarioDB[]>;
  }
}
export default new FuncionarioData();
