import { Servicos } from '../types/Servicos';
import { ServicosData } from '../data/ServicosData';
import { GeoService } from '../services/APIlocalizacao';
import { ValidationError, GoogleMapsAPIError } from '../utils/CustomErrors';


const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export class ServicosBusiness {
    private servicosData: ServicosData;
    private geoService: GeoService;

    constructor() {
        this.servicosData = new ServicosData();
        this.geoService = new GeoService()
    }

    async createServico(servico: Servicos): Promise<Servicos> {
        if (!servico.nome || !servico.tipo || !servico.cidade || !servico.endereco || !servico.telefone || servico.gratuito === undefined || !servico.categoria) {
            throw new ValidationError('Todos os campos obrigatórios devem ser preenchidos.');
        }
        if (!GOOGLE_API_KEY) {
            throw new GoogleMapsAPIError("A chave GOOGLE_MAPS_API_KEY não está configurada.");
        }
        try {
            const fullAddress = servico.endereco + ", " + servico.cidade; 
            
            const { latitude, longitude } = await this.geoService.getCoordenadas(
                fullAddress,
                GOOGLE_API_KEY
            );

            const dadosParaSalvar = {
                ...servico, 
                latitude: latitude, 
                longitude: longitude, 
            } as Servicos; 

            return this.servicosData.create(dadosParaSalvar);
        } catch (error: any) {
            if (error instanceof ValidationError || error instanceof GoogleMapsAPIError) {
                throw error;
            }
            throw new Error(`Erro ao processar o endereço: ${error.message}`);
        }
    }

    async getServicos(cidade?: string, gratuito?: boolean, categoria?: string): Promise<Servicos[]> {
        return this.servicosData.getAll(cidade, gratuito, categoria);
    }

    async getServicoById(id: number): Promise<Servicos | undefined> {
        if (!id) {
            throw new ValidationError('ID do serviço é obrigatório.');
        }
        return this.servicosData.getById(id);
    }

    async updateServico(id: number, servico: Partial<Servicos>): Promise<Servicos | undefined> {
        if (!id) {
            throw new ValidationError('ID do serviço é obrigatório.');
        }
        return this.servicosData.update(id, servico);
    }

    async deleteServico(id: number): Promise<boolean> {
        if (!id) {
            throw new ValidationError('ID do serviço é obrigatório.');
        }
        return this.servicosData.delete(id);
    }
}
