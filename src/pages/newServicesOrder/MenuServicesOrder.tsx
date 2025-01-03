import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../redux/store"

const MenuServicesOrder: React.FC = () => {

    const navigate = useNavigate()

    const { serviceOrder } = useSelector((state: RootState) => state.servicesOrderForm)

    const handleClickClient = () => {
        navigate(`/service-order/cliente/${serviceOrder}`)
    }

    const handleClickEquipment = () => {
        navigate(`/service-order/equipo/${serviceOrder}`)
    }

    const handleClickImage = () => {
        navigate(`/service-order/imagen/${serviceOrder}`)
    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
                <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
                    <h3 className="font-medium text-black dark:text-white">
                        <FontAwesomeIcon icon={faBars} /> &nbsp; Menu - Detalles Orden de Servicio
                    </h3>
                </div>
                <div className="p-4 sm:p-6 xl:p-9">
                    <div className="flex justify-between">
                        <div className="min-w-[370px] max-w-max rounded-md border border-stroke py-1 dark:border-strokedark">
                            <ul className="flex flex-col">
                                <li className="flex items-center gap-2.5 border-b border-stroke px-5 py-5 last:border-b-0 dark:border-strokedark">
                                    <span className="text-primary">
                                        <svg
                                            className="fill-current"
                                            width="21"
                                            height="21"
                                            viewBox="0 0 21 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_1890_16515)">
                                                <path
                                                    d="M10.8672 0.949463C5.64844 0.949463 1.42969 5.16821 1.42969 10.387C1.42969 15.6057 5.64844 19.8557 10.8672 19.8557C16.0859 19.8557 20.3359 15.6057 20.3359 10.387C20.3359 5.16821 16.0859 0.949463 10.8672 0.949463ZM10.8672 18.4495C6.42969 18.4495 2.83594 14.8245 2.83594 10.387C2.83594 5.94946 6.42969 2.35571 10.8672 2.35571C15.3047 2.35571 18.9297 5.98071 18.9297 10.4182C18.9297 14.8245 15.3047 18.4495 10.8672 18.4495Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M13.5549 7.48076L9.83611 11.1058L8.14861 9.44951C7.86736 9.16826 7.42986 9.19951 7.14861 9.44951C6.86736 9.73076 6.89861 10.1683 7.14861 10.4495L9.14861 12.387C9.33611 12.5745 9.58611 12.6683 9.83611 12.6683C10.0861 12.6683 10.3361 12.5745 10.5236 12.387L14.5549 8.51201C14.8361 8.23076 14.8361 7.79326 14.5549 7.51201C14.2736 7.23076 13.8361 7.23076 13.5549 7.48076Z"
                                                    fill=""
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1890_16515">
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        fill="white"
                                                        transform="translate(0.867188 0.386963)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <span>Cliente</span>
                                    <div style={{ cursor: 'pointer' }} className="ml-auto h-7.5 w-full max-w-7.5 flex items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
                                        <svg className="fill-primary stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClickClient}>
                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="" stroke="" />                                            </svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="min-w-[370px] max-w-max rounded-md border border-stroke py-1 dark:border-strokedark">
                            <ul className="flex flex-col">
                                <li className="flex items-center gap-2.5 border-b border-stroke px-5 py-5 last:border-b-0 dark:border-strokedark">
                                    <span className="text-primary">
                                        <svg
                                            className="fill-current"
                                            width="21"
                                            height="21"
                                            viewBox="0 0 21 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_1890_16515)">
                                                <path
                                                    d="M10.8672 0.949463C5.64844 0.949463 1.42969 5.16821 1.42969 10.387C1.42969 15.6057 5.64844 19.8557 10.8672 19.8557C16.0859 19.8557 20.3359 15.6057 20.3359 10.387C20.3359 5.16821 16.0859 0.949463 10.8672 0.949463ZM10.8672 18.4495C6.42969 18.4495 2.83594 14.8245 2.83594 10.387C2.83594 5.94946 6.42969 2.35571 10.8672 2.35571C15.3047 2.35571 18.9297 5.98071 18.9297 10.4182C18.9297 14.8245 15.3047 18.4495 10.8672 18.4495Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M13.5549 7.48076L9.83611 11.1058L8.14861 9.44951C7.86736 9.16826 7.42986 9.19951 7.14861 9.44951C6.86736 9.73076 6.89861 10.1683 7.14861 10.4495L9.14861 12.387C9.33611 12.5745 9.58611 12.6683 9.83611 12.6683C10.0861 12.6683 10.3361 12.5745 10.5236 12.387L14.5549 8.51201C14.8361 8.23076 14.8361 7.79326 14.5549 7.51201C14.2736 7.23076 13.8361 7.23076 13.5549 7.48076Z"
                                                    fill=""
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1890_16515">
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        fill="white"
                                                        transform="translate(0.867188 0.386963)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <span>Equipo</span>
                                    <div style={{ cursor: 'pointer' }} className="ml-auto h-7.5 w-full max-w-7.5 flex items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
                                        <svg className="fill-primary stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClickEquipment}>
                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="" stroke="" />                                            </svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="p-2 sm:p-5 xl:p-9">
                    <div className="flex justify-between">
                        <div className="min-w-[370px] max-w-max rounded-md border border-stroke py-1 dark:border-strokedark">
                            <ul className="flex flex-col">
                                <li className="flex items-center gap-2.5 border-b border-stroke px-5 py-5 last:border-b-0 dark:border-strokedark">
                                    <span className="text-primary">
                                        <svg
                                            className="fill-current"
                                            width="21"
                                            height="21"
                                            viewBox="0 0 21 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_1890_16515)">
                                                <path
                                                    d="M10.8672 0.949463C5.64844 0.949463 1.42969 5.16821 1.42969 10.387C1.42969 15.6057 5.64844 19.8557 10.8672 19.8557C16.0859 19.8557 20.3359 15.6057 20.3359 10.387C20.3359 5.16821 16.0859 0.949463 10.8672 0.949463ZM10.8672 18.4495C6.42969 18.4495 2.83594 14.8245 2.83594 10.387C2.83594 5.94946 6.42969 2.35571 10.8672 2.35571C15.3047 2.35571 18.9297 5.98071 18.9297 10.4182C18.9297 14.8245 15.3047 18.4495 10.8672 18.4495Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M13.5549 7.48076L9.83611 11.1058L8.14861 9.44951C7.86736 9.16826 7.42986 9.19951 7.14861 9.44951C6.86736 9.73076 6.89861 10.1683 7.14861 10.4495L9.14861 12.387C9.33611 12.5745 9.58611 12.6683 9.83611 12.6683C10.0861 12.6683 10.3361 12.5745 10.5236 12.387L14.5549 8.51201C14.8361 8.23076 14.8361 7.79326 14.5549 7.51201C14.2736 7.23076 13.8361 7.23076 13.5549 7.48076Z"
                                                    fill=""
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1890_16515">
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        fill="white"
                                                        transform="translate(0.867188 0.386963)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <span>Imagen</span>
                                    <div style={{ cursor: 'pointer' }} className="ml-auto h-7.5 w-full max-w-7.5 flex items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
                                        <svg className="fill-primary stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClickImage}>
                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="" stroke="" />                                            </svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuServicesOrder