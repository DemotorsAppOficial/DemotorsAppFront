import apiClient from '../api';
import { EmployeeTypeModel } from '../../models/employeeTypeModel';
const complementURL = 'employee-types'

interface EmployeeTypeResponse {
    response: EmployeeTypeModel[];
}

interface CreateEmployeeTypeResponse {
    response: {
        status: string;
        message: string;
    };
}

export const getEmployeeTypes = async (): Promise<EmployeeTypeModel[]> => {
    try {
        const response = await apiClient.get<EmployeeTypeResponse>(`${complementURL}/getAllEmployeeType`);
        return response.data.response;
    }
    catch (error) {
        console.error('Error al obtener los Tipos de Empleado:', error);
        throw new Error('No se pudieron obtener los Tipos de Empleado. Por favor, intenta de nuevo más tarde.');
    }
};

export const createEmployeeType = async (employeeType: EmployeeTypeModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.post<CreateEmployeeTypeResponse>(`${complementURL}/createEmployeeType`, employeeType);
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

export const updateEmployeeType = async (employeeType: EmployeeTypeModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateEmployeeTypeResponse>(`${complementURL}/updateEmployeeType`, employeeType);
        const { status, message } = response.data.response;
        if (status === 'ERROR' || status === 'ALERT') 
        {
            throw { status, message };
        }
        return { status, message }; 
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        const errorMessage = errorResponse.message || 'Error desconocido al actualizar el Tipo de Empleado.';
        const errorStatus = errorResponse.status || 'ERROR';
        throw { status: errorStatus, message: errorMessage };
    }
};

export const deleteEmployeeType = async (employeeType: EmployeeTypeModel): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateEmployeeTypeResponse>(`${complementURL}/deleteEmployeeType`, employeeType);
        const { status, message } = response.data.response;
        if (status === 'ERROR' || status === 'ALERT') 
        {
            throw { status, message };
        }
        return { status, message }; 
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        const errorMessage = errorResponse.message || 'Error desconocido al eliminar el Tipo de Empleado.';
        const errorStatus = errorResponse.status || 'ERROR';
        throw { status: errorStatus, message: errorMessage };
    }
};