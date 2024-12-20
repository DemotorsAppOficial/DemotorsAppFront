import { useEffect, useState } from "react"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import MenuServicesOrder from "./MenuServicesOrder"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { setAttentionTo, setServiceOrder } from "../../redux/slices/servicesOrderSlice"
import servicesOrderRequest from "../../hooks/servicesOrderRequest"

const GeneralData: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { attentionTo, serviceOrder, active } = useSelector((state: RootState) => state.servicesOrderForm)

    const [validate, setValidate] = useState(false)

    const { postServiceOrder, getValidateServicesOrder} = servicesOrderRequest()

    const onHandleClick = async (e: any) => {
        e.preventDefault()
        const resp = await getValidateServicesOrder(serviceOrder)
        if (resp === 1) {
            setValidate(true)
        } else {
            setValidate(false)
        }
    }

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            switch (name) {
                case 'attentionTo':
                    dispatch(setAttentionTo(value))
                    break;
                case 'serviceOrder':
                    dispatch(setServiceOrder(value))
                    break;
            }

    }

    const generateCorrelative = () => {
        if (attentionTo === '') {
            toast.warning('Necesitamos que ingrese primero a quien sera la atencion', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false
            })
        } else {
            const correlative = `2024-${Math.trunc(Math.random() * (10000000 - 1 + 1) + 1)}`
            dispatch(setServiceOrder(correlative))
            postServiceOrder(correlative)
            setValidate(true)
        }
    }

    return (
        <>
            <Breadcrumb pageName="Orden de servicio" />
            <form onSubmit={onHandleClick}>
                <div className="mb-4.5 flex flex-col gap-12 xl:flex-row">
                    <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Atencion A <span className="text-meta-1">*</span>
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                name="attentionTo"
                                value={attentionTo}
                                onChange={onHandleChange}
                                className="flex-grow rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-12 xl:flex-row">
                    <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                            No. Orden <span className="text-meta-1">*</span>
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                name="serviceOrder"
                                placeholder="No. Orden"
                                value={serviceOrder}
                                onChange={onHandleChange}
                                className="flex-grow rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <button
                                type="button"
                                className="flex h-10 w-20 items-center justify-center bg-blue-400 text-white hover:bg-primary-dark transition"
                                aria-label="Agregar Dirección"
                                title="Agregar Dirección"
                                disabled={validate}
                                onClick={onHandleClick}
                            >
                                Validar
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-20 items-center justify-center bg-primary text-white hover:bg-primary-dark transition"
                                aria-label="Agregar Dirección"
                                title="Agregar Dirección"
                                disabled={(serviceOrder !== '') ? true : false}
                                onClick={generateCorrelative}
                            >
                                Generar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {
                (active && validate) && (
                    <MenuServicesOrder />
                )
            }
        </>
    )
}

export default GeneralData