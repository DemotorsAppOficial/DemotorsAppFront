import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSync } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadComponent from '../../../components/Load/LoadComponent';
import { ServiceModel } from '../../../models/serviceModel';
import { updateService } from '../../../services/serviceService/serviceService';

const ServiceFormUpdate = ({
    onNewService,
    closeModal,
    service,
}: {
    onNewService: (newService: ServiceModel) => void;
    closeModal: () => void;
    service: ServiceModel | null;
}) => {
    const [formData, setFormData] = useState<ServiceModel>({
        ID_SERVICE: 0,
        SERVICE_DESCRIPTION: '',
        USER_CREATED: '',
        DATE_CREATED: '',
        USER_MODIFIED: '',
        DATE_MODIFIED: '',
        STATE: 'A',
    });

    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (service) {
            setFormData(service);
        }
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setIsTouched(true);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.SERVICE_DESCRIPTION.trim()) {
            setIsTouched(true);
            return;
        }

        setLoading(true);

        try {
            const { status, message } = await updateService(formData);
            setLoading(false);

            if (status === 'SUCCESS') {
                onNewService(formData);
                closeModal();
                toast.success(message, {
                    autoClose: 3000,
                    className: "dark:bg-boxdark dark:text-white",
                });
            }
        } catch (err: any) {
            setLoading(false);
            if (err.status === 'ALERT') {
                toast.warning(err.message, {
                    autoClose: 3000,
                    className: "dark:bg-boxdark dark:text-white"
                });
            } else if (err.status === 'ERROR') {
                toast.error(`Error: ${err.message}`, {
                    autoClose: 3000,
                    className: "dark:bg-boxdark dark:text-white"
                });
            } else {
                toast.error('Error desconocido al actualizar el Servicio.', {
                    autoClose: 3000,
                    className: "dark:bg-boxdark dark:text-white"
                });
            }
        }

    };

    if (loading) {
        return <LoadComponent />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Pregunta <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    name="SERVICE_DESCRIPTION" 
                    value={formData.SERVICE_DESCRIPTION}
                    onChange={handleChange}
                    onBlur={() => setIsTouched(true)}
                    placeholder="Descripción del Servicio"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${isTouched && !formData.SERVICE_DESCRIPTION.trim() ? 'border-red-500' : ''}`}
                    required
                />
                {isTouched && !formData.SERVICE_DESCRIPTION.trim() && (
                    <p className="text-red-500 mt-1">La pregunta es obligatoria.</p>
                )}
            </div>
            <div className="flex justify-end gap-4.5">
                <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                    onClick={() => {
                        closeModal();
                    }}
                >
                    Cancelar &nbsp;
                    <FontAwesomeIcon icon={faCancel} style={{ marginTop: '5px' }} />
                </button>
                <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                >
                    Actualizar &nbsp;
                    <FontAwesomeIcon icon={faSync} style={{ marginTop: '5px' }} />
                </button>
            </div>
        </form>
    );
};

export default ServiceFormUpdate;
