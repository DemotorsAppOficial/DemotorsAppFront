import apiClient from '../api'
import { ReportServicesOrderModel } from '../../models/reportServicesOrderModel'
import { ReportClientsModel } from '../../models/reportClientsModel'
import { ReportDetailsEquipmentModel } from '../../models/reportDetailsEquipmentModel'
import { ReportImageModel } from '../../models/reportImageModel'

const complementURL = 'services-order'
const complementURLClient = 'client'
const complementURLEquipment = 'equipment'
const complementURLImage = 'image'

interface ServicesOrderReportResponse {
    response: ReportServicesOrderModel[]
}

interface ClientEquipmentReportResponse {
    response: ReportClientsModel[]
}

interface DetailsEquipmentReportResponse {
    response: ReportDetailsEquipmentModel[]
}

interface imageReportResponse {
    response: ReportImageModel[]
}

export const getServicesOrders = async (idClient: number, startDate: string, endDate: string): Promise<ReportServicesOrderModel[]> => {
    try {
        const response = await apiClient.get<ServicesOrderReportResponse>(`${complementURL}/getServicesOrders/${idClient}/${startDate}/${endDate}`)
        return response.data.response
    } catch (error) {
        console.error('Error al obtener las ordenes de servicios:', error);
        throw new Error('No se pudieron obtener las ordenes de servicios. Por favor, intenta de nuevo más tarde.');
    }
}

export const getClientEquipments = async (idClient: number, startDate: string, endDate: string): Promise<ReportClientsModel[]> => {
    try {
        const response = await apiClient.get<ClientEquipmentReportResponse>(`${complementURLClient}/getEquipmentByClients/${idClient}/${startDate}/${endDate}`)
        return response.data.response
    } catch (error) {
        console.error('Error al obtener las ordenes de servicios:', error);
        throw new Error('No se pudieron obtener los equipos por clientes. Por favor, intenta de nuevo más tarde.');
    }
}

export const getDetailsEquipments = async (idClient: number, noSerie: string, startDate: string, endDate: string): Promise<ReportDetailsEquipmentModel[]> => {
    try {
        const response = await apiClient.get<DetailsEquipmentReportResponse>(`${complementURLEquipment}/getDetailsEquipment/${idClient}/${noSerie}/${startDate}/${endDate}`)
        return response.data.response
    } catch (error) {
        console.error('Error al obtener las ordenes de servicios:', error);
        throw new Error('No se pudieron obtener los detalles de los equipos. Por favor, intenta de nuevo más tarde.');
    }
}

export const getimageReportClient = async (idClient: number, startDate: string, endDate: string): Promise<ReportImageModel[]> => {
    try {
        const response = await apiClient.get<imageReportResponse>(`${complementURLImage}/get/images/clients/${idClient}/${startDate}/${endDate}`)
        return response.data.response
    } catch (error) {
        console.error('Error al obtener las ordenes de servicios:', error);
        throw new Error('No se pudieron obtener los detalles de los equipos. Por favor, intenta de nuevo más tarde.');
    }
}

export const getimageReportEquipment = async (idClient: number, noSerie: string, startDate: string, endDate: string): Promise<ReportImageModel[]> => {
    try {
        const response = await apiClient.get<imageReportResponse>(`${complementURLImage}/get/images/equipment/${idClient}/${noSerie}/${startDate}/${endDate}`)
        return response.data.response
    } catch (error) {
        console.error('Error al obtener las ordenes de servicios:', error);
        throw new Error('No se pudieron obtener los detalles de los equipos. Por favor, intenta de nuevo más tarde.');
    }
}