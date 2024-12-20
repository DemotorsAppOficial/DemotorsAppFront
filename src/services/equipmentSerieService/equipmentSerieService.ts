import apiClient from '../api';
import { EquipmentSerieModel } from '../../models/equipmentSerieModel';

const complementURL = 'equipment-serie'

interface EquipmentSerieResponse {
    response: EquipmentSerieModel[];
}

interface CreateEquipmentSerieResponse {
    response: {
        status: string;
        message: string;
    };
}

export const getEquipmentSeries = async (): Promise<EquipmentSerieModel[]> => 
{
    try 
    {
        const response = await apiClient.get<EquipmentSerieResponse>(`${complementURL}/getAllEquipmentSerie`);
        return response.data.response;
    } 
    catch (error) 
    {
        console.error('Error al obtener las Series de Equipos:', error);
        throw new Error('No se pudieron obtener las Series de Equipos. Por favor, intenta de nuevo más tarde.');
    }
};

export const createEquipmentSerie = async (equipmentSerie: EquipmentSerieModel): Promise<string> => {
    try {
        const response = await apiClient.post<CreateEquipmentSerieResponse>(`${complementURL}/createEquipmentSerie`, equipmentSerie);
        const { status, message } = response.data.response;

        if (status === 'ERROR') {
            throw new Error(message);
        }

        return message;
    } catch (error) {
        throw new Error(`Error al crear la Serie de Equipo. ${error}`);
    }
};

