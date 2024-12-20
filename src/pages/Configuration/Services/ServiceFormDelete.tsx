import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadComponent from '../../../components/Load/LoadComponent';
import { deleteService } from '../../../services/serviceService/serviceService';
import { ServiceModel } from '../../../models/serviceModel';

const ServiceFormDelete = ({
    onNewService,
    closeModal,
    service,
}: {
    onNewService: (service: ServiceModel) => void;
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

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (service) {
            setFormData(service);
        }
    }, [service]);



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        setLoading(true);

        try {
            const { status, message } = await deleteService(formData);
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
                toast.error('Error desconocido al eliminar el Servicio.', {
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
            <div className="mb-4.5 text-center">
                <p>¿Está seguro que desea eliminar el Servicio?</p>
            </div>
            <div className="flex justify-end gap-4.5 mt-5">
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
                    className="flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                >
                    Eliminar &nbsp;
                    <FontAwesomeIcon icon={faTrashAlt} style={{ marginTop: '5px' }} />
                </button>
            </div>
        </form>
    );
};

export default ServiceFormDelete;
