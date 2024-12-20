import apiClient from "../api"
import { EquipmentModel } from "../../models/equipmentModel"

const complementURL = 'equipment'

interface CreateEquipmentResponse {
    response: {
        status: string;
        message: string;
        lastId: number;
    }
}

export const createEquipment = async (equipment: EquipmentModel) => {
    try {
        const responseApi = await apiClient.post<CreateEquipmentResponse>(`${complementURL}/createEquipment`, equipment)
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