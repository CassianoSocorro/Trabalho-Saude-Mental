export interface Funcionario {
  id: number;
  servico_id: number | null;
  nome: string;
  cargo: string;
  email: string;
  telefone?: string;
  data_admissao: Date;
  salario?: number;
  senha?: string;
}

export interface FuncionarioInput {
  servico_id: number | null;
  nome: string;
  cargo: string;
  email: string;
  telefone?: string;
  data_admissao: Date;
  salario: number;
  senha?: string;
}

export interface FuncionarioFiltros {
  nome?: string;
  cargo?: string;
  email?: string;
  sort_by?: string;
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}
