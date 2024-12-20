import apiClient from "../api"
import { ClientModel } from "../../models/clientModel"
import { ClientsModel } from "../../models/ClientsModel"

const complementURL = 'client'

interface ClientsResponse {
    response: ClientsModel[]
}

interface CreateClientResponse {
    response: {
        status: string;
        message: string;
        lastId: number;
    }
}

export const getClients = async (): Promise<ClientsModel[]> => {
    try {
        const response = await apiClient.get<ClientsResponse>(`${complementURL}/getClients`)
        return response.data.response
    } catch (error) {
        console.error('Error al obtener los Clientes:', error);
        throw new Error('No se pudieron obtener los Clientes. Por favor, intenta de nuevo más tarde.');
    }
}

export const createClient = async (client: ClientModel): Promise<CreateClientResponse> => {
    try {
        const responseApi = await apiClient.post<CreateClientResponse>(`${complementURL}/createClient`, client)
        console.log(responseApi)
        const { data: response } = responseApi
        return response
    } catch (error) {
        return {
            response: {
                status: 'ERROR',
                message: 'Error al intentar comunicarse con la API',
                lastId: 0
            }
        }
    }
}