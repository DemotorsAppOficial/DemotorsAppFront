import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste, faPercent, faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchOrder: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Función para alternar el estado del dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Cerrar el dropdown si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const items = [
        { id: 1, name: 'Datos Generales' },
        { id: 2, name: 'Datos del Equipo' },
        { id: 3, name: 'Servicio Solicitado' },
        { id: 4, name: 'Constancia de Entrega' },
        { id: 5, name: 'Trabajo Realizado' },
        { id: 6, name: 'Carga de Fotos' },

    ];

    return (
        <>
            <Breadcrumb pageName="Búsqueda de Orden" />

            {/* <div className="relative mb-50 inline-block" ref={dropdownRef}>
                <a
                    className="inline-flex items-center gap-2.5 rounded-md bg-primary py-3 px-5.5 font-medium text-white hover:bg-opacity-90 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    Dropdown Button
                    <svg className={`fill-current duration-200 ease-linear ${isDropdownOpen ? 'rotate-180' : ''}`} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.564864 0.879232C0.564864 0.808624 0.600168 0.720364 0.653125 0.667408C0.776689 0.543843 0.970861 0.543844 1.09443 0.649756L5.82517 5.09807C5.91343 5.18633 6.07229 5.18633 6.17821 5.09807L10.9089 0.649756C11.0325 0.526192 11.2267 0.543844 11.3502 0.667408C11.4738 0.790972 11.4562 0.985145 11.3326 1.10871L6.60185 5.55702C6.26647 5.85711 5.73691 5.85711 5.41917 5.55702L0.670776 1.10871C0.600168 1.0381 0.564864 0.967492 0.564864 0.879232Z" fill=""></path>
                    </svg>
                </a>

                {isDropdownOpen && (
                    <div className="absolute left-0 top-full z-40 mt-2 w-full rounded-md border border-stroke bg-white py-3 shadow-card dark:border-strokedark dark:bg-boxdark">
                        <ul className="flex flex-col">
                            <li><a className="flex py-2 px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4" href="/ui/dropdowns">Dashboard</a></li>
                            <li><a className="flex py-2 px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4" href="/ui/dropdowns">Settings</a></li>
                            <li><a className="flex py-2 px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4" href="/ui/dropdowns">Earnings</a></li>
                            <li><a className="flex py-2 px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4" href="/ui/dropdowns">Logout</a></li>
                        </ul>
                    </div>
                )}
            </div> */}

            <div className="relative">
                <input
                    type="text"
                    placeholder="NO. Orden"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-4" />
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
                <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
                    <h3 className="font-medium text-black dark:text-white">
                        <FontAwesomeIcon icon={faPaste} /> &nbsp; Orden de Servicio
                    </h3>                </div>
                <div className="p-4 sm:p-6 xl:p-9">
                    <div className="flex justify-between">
                        <div className="min-w-[370px] max-w-max rounded-md border border-stroke py-1 dark:border-strokedark">
                            <ul className="flex flex-col">
                                {items.slice(0, Math.ceil(items.length / 2)).map(item => (
                                    <li key={item.id} className="flex items-center gap-2.5 border-b border-stroke px-5 py-5 last:border-b-0 dark:border-strokedark">
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
                                        <span>{item.name}</span>
                                        <div style={{ cursor: 'pointer' }} className="ml-auto h-7.5 w-full max-w-7.5 flex items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
                                            <svg className="fill-primary stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="" stroke="" />                                            </svg>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="min-w-[370px] max-w-max rounded-md border border-stroke py-1 dark:border-strokedark">
                            <ul className="flex flex-col">
                                {items.slice(Math.ceil(items.length / 2)).map(item => (
                                    <li key={item.id} className="flex items-center gap-2.5 border-b border-stroke px-5 py-5 last:border-b-0 dark:border-strokedark">
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
                                        <span>{item.name}</span>
                                        <div style={{ cursor: 'pointer' }} className="ml-auto h-7.5 w-full max-w-7.5 flex items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4">
                                            <svg className="fill-primary stroke-primary duration-200 ease-in-out dark:fill-white dark:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="" stroke="" />                                            </svg>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
                <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
                    <h3 className="font-medium text-black dark:text-white">
                        <FontAwesomeIcon icon={faPercent} /> &nbsp; Porcentaje Avance
                    </h3>                </div>
                <div className="p-4 sm:p-6 xl:p-9">
                    <div className="flex max-w-[100%] flex-col gap-10 pt-5 xl:pt-4">
                        <div className="relative h-2.5 w-full rounded-full bg-stroke dark:bg-strokedark">
                            <div className="absolute left-0 h-full w-4/5 rounded-full bg-primary">
                                <span className="absolute bottom-full -right-4 z-1 mb-2 inline-block rounded-sm bg-primary px-2 py-1 text-xs font-bold text-white">
                                    <span className="absolute -bottom-1 left-1/2 -z-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary"></span>
                                    80%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchOrder;
