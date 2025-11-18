import { Avaliacao } from "../types/Avaliacao";
import { connection as dbConnection } from "../dbConnection";

export class AvaliacaoData {
  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    const [newAvaliacao] = await dbConnection("avaliacoes")
      .insert(avaliacao)
      .returning("*");
    return newAvaliacao;
  }

  async getByServicoId(servico_id: number): Promise<Avaliacao[]> {
    return dbConnection("avaliacoes").where({ servico_id });
  }

  async update(
    id: number,
    avaliacao: Partial<Avaliacao>
  ): Promise<Avaliacao | undefined> {
    const [updatedAvaliacao] = await dbConnection("avaliacoes")
      .where({ id })
      .update(avaliacao)
      .returning("*");
    return updatedAvaliacao;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await dbConnection("avaliacoes").where({ id }).del();
    return deletedCount > 0;
  }

  async getAll(): Promise<Avaliacao[]> {
    try {
      const avaliacoes = await dbConnection("avaliacoes").select();
      return avaliacoes as Avaliacao[];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
