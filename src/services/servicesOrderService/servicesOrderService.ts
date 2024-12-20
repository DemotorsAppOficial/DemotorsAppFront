import apiClient from '../api'
import { ServicesOrderModel } from '../../models/serviceOrderModel'

const complementURL = 'services-order'

interface CreateServicesOrderResponse {
    response: {
        status: string;
        message: string;
        lastId: number;
    }
}

interface ValidateServicesOrderResponse {
    response: [
        {
            VALIDATE_SERVICES: number;
        }
    ]
}

export const createServiceOrder = async (servicesOrder: ServicesOrderModel): Promise<CreateServicesOrderResponse> => {
    try {
        const responseApi = await apiClient.post<CreateServicesOrderResponse>(`${complementURL}/createServicesOrders`, servicesOrder)
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

export const validateServiceOrder = async (servicesOrder: string): Promise<ValidateServicesOrderResponse> => {
    try {
        const responseApi = await apiClient.get<ValidateServicesOrderResponse>(`${complementURL}/validateServicesOrder/${servicesOrder}`)
        return responseApi.data
    } catch (error) {
        return {
            response: [
                {
                    VALIDATE_SERVICES: 0
                }
            ]
        }
    }
}