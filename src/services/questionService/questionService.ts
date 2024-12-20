import apiClient from '../api';
import { Question } from '../../models/questioModel';

const complementURL = 'survey-question'

interface QuestionResponse {
    response: Question[];
}

interface CreateQuestionResponse {
    response: {
        status: string;
        message: string;
    };
}

export const getQuestions = async (): Promise<Question[]> => 
{
    try 
    {
        const response = await apiClient.get<QuestionResponse>(`${complementURL}/getAllQuestion`);
        return response.data.response;
    } 
    catch (error) 
    {
        console.error('Error al obtener las preguntas:', error);
        throw new Error('No se pudieron obtener las preguntas. Por favor, intenta de nuevo más tarde.');
    }
};

export const createQuestion = async (question: Question): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.post<CreateQuestionResponse>(`${complementURL}/createSurveyQuestion`, question);
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

export const updateQuestion = async (question: Question): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateQuestionResponse>(`${complementURL}/updateSurveyQuestion`, question);
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

export const deleteSurveyQuestion = async (question: Question): Promise<{ status: string; message: string }> => {
    try {
        const response = await apiClient.put<CreateQuestionResponse>(`${complementURL}/deleteSurveyQuestion`, question);
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