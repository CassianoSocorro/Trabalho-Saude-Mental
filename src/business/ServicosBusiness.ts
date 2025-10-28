import { Servicos } from '../types/Servicos';
import { ServicosData } from '../data/ServicosData';

export class ServicosBusiness {
    private servicosData: ServicosData;

    constructor() {
        this.servicosData = new ServicosData();
    }

    async createServico(servico: Servicos): Promise<Servicos> {
        if (!servico.nome || !servico.tipo || !servico.cidade || !servico.endereco || !servico.telefone || servico.gratuito === undefined || !servico.categoria) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
        }
        return this.servicosData.create(servico);
    }

    async getServicos(cidade?: string, gratuito?: boolean, categoria?: string): Promise<Servicos[]> {
        return this.servicosData.getAll(cidade, gratuito, categoria);
    }

    async getServicoById(id: number): Promise<Servicos | undefined> {
        if (!id) {
            throw new Error('ID do serviço é obrigatório.');
        }
        return this.servicosData.getById(id);
    }

    async updateServico(id: number, servico: Partial<Servicos>): Promise<Servicos | undefined> {
        if (!id) {
            throw new Error('ID do serviço é obrigatório.');
        }
        return this.servicosData.update(id, servico);
    }

    async deleteServico(id: number): Promise<boolean> {
        if (!id) {
            throw new Error('ID do serviço é obrigatório.');
        }
        return this.servicosData.delete(id);
    }
}
