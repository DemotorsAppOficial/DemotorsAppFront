import apiClient from '../api';
import { ServiceModel } from '../../models/serviceModel';
const complementURL = 'service'

interface ServiceResponse {
    response: ServiceModel[];
}

interface CreateServiceResponse {
    response: {
        status: string;
        message: string;
    };
}

export const getServices = async (): Promise<ServiceModel[]> => {
    try {
        const response = await apiClient.get<ServiceResponse>(`${complementURL}/getAllService`);
        return response.data.response;
    }
    catch (error) {
        console.error('Error al obtener los Servicios:', error);
        throw new Error('No se pudieron obtener los Servicios. Por favor, intenta de nuevo más tarde.');
    }
};

export const createService = async (service: ServiceModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.post<CreateServiceResponse>(`${complementURL}/createService`, service);
        const { status, message } = response.data.response;
        if (status === 'ERROR' || status === 'ALERT') 
        {
            throw { status, message };
        }
        return { status, message }; 
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        const errorMessage = errorResponse.message || error;
        const errorStatus = errorResponse.status || 'ERROR';
        throw { status: errorStatus, message: errorMessage };
    }
};

export const updateService = async (service: ServiceModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateServiceResponse>(`${complementURL}/updateService`, service);
        const { status, message } = response.data.response;
        if (status === 'ERROR' || status === 'ALERT') 
        {
            throw { status, message };
        }
        return { status, message }; 
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        const errorMessage = errorResponse.message || error;
        const errorStatus = errorResponse.status || 'ERROR';
        throw { status: errorStatus, message: errorMessage };
    }
};

export const deleteService = async (service: ServiceModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateServiceResponse>(`${complementURL}/deleteService`, service);
        const { status, message } = response.data.response;
        if (status === 'ERROR' || status === 'ALERT') 
        {
            throw { status, message };
        }
        return { status, message }; 
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        const errorMessage = errorResponse.message || error;
        const errorStatus = errorResponse.status || 'ERROR';
        throw { status: errorStatus, message: errorMessage };
    }
};