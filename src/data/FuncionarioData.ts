import { connection as db } from "../dbConnection";
import { Funcionario, FuncionarioFiltros } from "../types/Funcionario";

type FuncionarioDB = Omit<Funcionario, "id"> & { id: number };
interface ListFilters extends FuncionarioFiltros {
  limit?: number;
  offset?: number;
}

class FuncionarioData {
  private tableName = "FUNCIONARIO";

  async findById(id: number): Promise<FuncionarioDB | undefined> {
    return db(this.tableName).where({ id }).select("*").first();
  }

  async findByEmail(email: string): Promise<FuncionarioDB | undefined> {
    return db(this.tableName).where({ email }).first();
  }

  async findAllWithFilters(filters: ListFilters): Promise<FuncionarioDB[]> {
    let query = db(this.tableName).select("*");

    if (filters.nome) {
      query = query.where("nome", "like", `%${filters.nome}%`);
    }
    if (filters.cargo) {
      query = query.where("cargo", "like", `%${filters.cargo}%`);
    }
    if (filters.email) {
      query = query.where("email", "like", `%${filters.email}%`);
    }

    const sortColumn = filters.sort_by || "id";
    const sortOrder = filters.order || "asc";
    query = query.orderBy(sortColumn, sortOrder);

    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    return query as Promise<FuncionarioDB[]>;
  }
  async create(dados: Omit<Funcionario, "id">): Promise<FuncionarioDB> {
    const [id_inserido] = await db(this.tableName).insert(dados);
    return this.findById(id_inserido) as Promise<FuncionarioDB>;
  }

  async update(id: number, dados: Partial<Funcionario>): Promise<number> {
    return db(this.tableName).where({ id }).update(dados);
  }

  async remove(id: number): Promise<number> {
    return db(this.tableName).where({ id }).del();
  }
}

export default new FuncionarioData();
