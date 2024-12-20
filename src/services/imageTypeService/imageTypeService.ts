import apiClient from '../api';
import { ImageTypeModel } from '../../models/imageTypeModel';
const complementURL = 'image-type'

interface ImageTypeResponse {
    response: ImageTypeModel[];
}

interface CreateImageTypeResponse {
    response: {
        status: string;
        message: string;
    };
}

export const getImageTypes = async (): Promise<ImageTypeModel[]> => {
    try {
        const response = await apiClient.get<ImageTypeResponse>(`${complementURL}/getAllImageType`);
        return response.data.response;
    }
    catch (error) {
        console.error('Error al obtener los Tipos de Imágenes:', error);
        throw new Error('No se pudieron obtener los Tipos de Imágenes. Por favor, intenta de nuevo más tarde.');
    }
};

export const createImageType = async (imageType: ImageTypeModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.post<CreateImageTypeResponse>(`${complementURL}/createImageType`, imageType);
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

export const updateImageType = async (employeeType: ImageTypeModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateImageTypeResponse>(`${complementURL}/updateImageType`, employeeType);
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

export const deleteImageType = async (employeeType: ImageTypeModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateImageTypeResponse>(`${complementURL}/deleteImageType`, employeeType);
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