import { connection as db } from "../dbConnection";
<<<<<<< HEAD
import { Funcionario } from "../types/Funcionario";

interface FuncionarioListFilters {
  nome?: string;
  email?: string;
  telefone?: string;
  sort_by?: string;
  order?: "asc" | "desc";
=======
import { Funcionario, FuncionarioFiltros } from "../types/Funcionario";

type FuncionarioDB = Omit<Funcionario, "id"> & { id: number };
interface ListFilters extends FuncionarioFiltros {
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
  limit?: number;
  offset?: number;
}

<<<<<<< HEAD
type FuncionarioDB = Omit<Funcionario, "id"> & { id: number };

class FuncionarioData {
  private tableName = "funcionarios";
=======
class FuncionarioData {
  private tableName = "FUNCIONARIO";
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da

  async findById(id: number): Promise<FuncionarioDB | undefined> {
    return db(this.tableName).where({ id }).select("*").first();
  }

  async findByEmail(email: string): Promise<FuncionarioDB | undefined> {
    return db(this.tableName).where({ email }).first();
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
    return db(this.tableName).where({ id }).update(dados);
  }

  async remove(id: number): Promise<number> {
    return db(this.tableName).where({ id }).del();
  }
<<<<<<< HEAD

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
=======
}

>>>>>>> 97619e4b417a553a6ff649319a68a8f4847184da
export default new FuncionarioData();
