import apiClient from "../api"
import { UploadImageModel } from '../../models/UploadImageModel'

const complementURL = 'image'

interface getImageServicesResponse {
    response: Array<UploadImageModel>
}

export const getImageServices = async (idServicesOrder: any): Promise<getImageServicesResponse> => {
    try {
        const responseApi = await apiClient.get<getImageServicesResponse>(`${complementURL}/get/images/${idServicesOrder}`)
        console.log('responseApi => ', responseApi)
        const { data: response } = responseApi
        return response
    } catch (error) {
        return {
            response: []
        }
    }
}