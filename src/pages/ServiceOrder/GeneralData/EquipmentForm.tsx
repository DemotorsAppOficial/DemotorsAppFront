import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { faGears, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectSerie from '../../../components/Forms/SelectGroup/SelectSerie';
import Modal from '../../../components/Modal/ModalComponent';
import SerieForm from './SerieForm';
import { RootState, AppDispatch } from '../../../redux/store';
import { setMotor, setMarca, setModelo, setSerie, setEspecificaciones } from '../../../redux/slices/equipamentFormSlice';
import { EquipmentSerieModel } from '../../../models/equipmentSerieModel';
import { getEquipmentSeries } from '../../../services/equipmentSerieService/equipmentSerieService';
import { useNavigate } from 'react-router-dom';
import servicesOrderRequest from '../../../hooks/servicesOrderRequest';

const EquipamentForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state: RootState) => state.equipamentForm);
    const [isModalOpen, setModalOpen] = useState(false);

    const { postEquipment } = servicesOrderRequest()

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'motor':
                dispatch(setMotor(value));
                break;
            case 'marca':
                dispatch(setMarca(value));
                break;
            case 'modelo':
                dispatch(setModelo(value));
                break;
            case 'serie':
                dispatch(setSerie(value));
                break;
            case 'especificaciones':
                dispatch(setEspecificaciones(value));
                break;
            default:
                break;
        }
    };

    const [equipmentSeries, setEquipmentSeries] = useState<EquipmentSerieModel[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEquipmentSeries = async () => {
        try {
            const result = await getEquipmentSeries();
            setEquipmentSeries(result);
        } catch (error) {
            console.error('Error al obtener las Series de Equipo:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipmentSeries();
    }, []);

    const handleNewSerie = (newSerie: EquipmentSerieModel) => {
        setEquipmentSeries((prevSeries) => [...prevSeries, newSerie]);
    };

    const handleReturnGeneralPage = () => {
        navigate('/services-order/general')
    }

    const handleSubmitEquipment = () => {
        postEquipment()
        navigate('/services-order/general')
    }


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    <FontAwesomeIcon icon={faGears} /> &nbsp; Datos del Equipo
                </h3>
            </div>
            <form action="#">
                <div className="p-6.5">
                    <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                        <div className='w-full xl:w-1/2'>
                            <label htmlFor="">Equipo</label>
                        </div>
                        <div className='w-full xl:w-1/2'>
                            <label htmlFor="">Motor</label>
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Motor
                            </label>
                            <input
                                type="text"
                                name="motor"
                                value={formData.motor}
                                onChange={handleChange}
                                placeholder="Motor del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Marca
                            </label>
                            <input
                                type="text"
                                name="marca"
                                value={formData.marca}
                                onChange={handleChange}
                                placeholder="Marca del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Modelo
                            </label>
                            <input
                                type="text"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleChange}
                                placeholder="Modelo del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Modelo
                            </label>
                            <input
                                type="text"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleChange}
                                placeholder="Modelo del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2 flex items-end">
                            <SelectSerie
                                equipmentSeries={equipmentSeries}
                                loading={loading}
                            />                         <button
                                type="button"
                                className="ml-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition relative"
                                aria-label="Agregar Serie"
                                title='Agregar Serie'
                                onClick={openModal}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Serie
                            </label>
                            <input
                                type="text"
                                name="serie"
                                value={formData.serie}
                                onChange={handleChange}
                                placeholder="Serie del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Especificaciones
                            </label>
                            <textarea
                                name="especificaciones"
                                value={formData.especificaciones}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Especificaciones del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Especificaciones
                            </label>
                            <textarea
                                name="especificaciones"
                                value={formData.especificaciones}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Especificaciones del Equipo"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="mb-4.5 pl-7.5 flex flex-col gap-6 xl:flex-row">
                    <button
                        type="button"
                        className="h-10 w-20 items-center justify-center bg-red-600 text-white hover:bg-primary-dark transition"
                        aria-label="Regresar"
                        title="Regresar"
                        onClick={handleReturnGeneralPage}
                    >
                        Regresar
                    </button>
                    <button
                        type="button"
                        className="h-10 w-20 items-center justify-center bg-primary text-white hover:bg-primary-dark transition"
                        aria-label="Guardar"
                        title="Guardar"
                        onClick={handleSubmitEquipment}
                    >
                        Guardar
                    </button>
                </div>
            </form>

            <Modal
                isOpen={isModalOpen}
                title="Agregar Serie"
                content={<SerieForm closeModal={closeModal} onNewSerie={handleNewSerie} />}
                onClose={closeModal}
            />
        </div>
    );
};

export default EquipamentForm;
