import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { ServicesOrderModel } from "../models/serviceOrderModel"
import { createServiceOrder, validateServiceOrder } from "../services/servicesOrderService/servicesOrderService"
import { toast } from "react-toastify"
import { ClientModel } from "../models/clientModel"
import { createClient } from "../services/clientService/clientService"
import { EquipmentModel } from "../models/equipmentModel"
import { createEquipment } from "../services/equipmentService/equipmentService"


const servicesOrderRequest = () => {
    const { servicesOrderForm, customerForm, equipamentForm } = useSelector((state: RootState) => state)

    const { attentionTo, serviceOrder } = servicesOrderForm

    const getValidateServicesOrder = async (serviceOrder: string) => {
        const responseApi = await validateServiceOrder(serviceOrder)
        const { response } = responseApi
        const { VALIDATE_SERVICES } = response[0]
        return VALIDATE_SERVICES
    }

    const postServiceOrder = async (correlative: string) => {
        const newService: ServicesOrderModel = {
            ATTETION_TO: attentionTo,
            NO_ORDER: correlative,
            USER_CREATED: ''
        }
        console.log(newService)
        const responseApi = await createServiceOrder(newService)
        const { response } = responseApi
        const { message } = response
        toast.success(message, {
            autoClose: 3000,
            className: 'dark:bg-boxdark dark:text-white'
        })
    }

    const postClient = async () => {
        const { name, email, address, date, phone, nit } = customerForm
        const newClient: ClientModel = {
            FULL_NAME: name,
            EMAIL: email,
            ADDRESS_CLIENT: address,
            ENTRY_DATE: date,
            PHONE_NUMBER: phone,
            NIT: nit,
            SERVICES_ORDER: serviceOrder
        }
        const responseApi = await createClient(newClient)
        const { response } = responseApi
        const { message } = response
        toast.success(message, {
            autoClose: 3000,
            className: "dark:bg-boxdark dark:text-white"
        })
    }

    const postEquipment = async () => {
        const { motor, marca, modelo, idSerie, serie, especificaciones } = equipamentForm
        const newEquipment: EquipmentModel = {
            ENGINE: motor,
            TRADEMARK: marca,
            MODEL_1: modelo,
            MODEL_2: modelo,
            ID_SERIE: idSerie,
            EQUIPMENT_SERIE: serie,
            DESCRIPTION: especificaciones,
            DESCRIPTION_2: especificaciones,
            SERVICES_ORDER: serviceOrder
        }
        let responseApi = await createEquipment(newEquipment)
            const { response } = responseApi
            const { message } = response
            toast.success(message, {
              autoClose: 3000,
              className: "dark:bg-boxdark dark:text-white"
            })
    }

    return { postServiceOrder, postClient, postEquipment, getValidateServicesOrder }
}

export default servicesOrderRequest