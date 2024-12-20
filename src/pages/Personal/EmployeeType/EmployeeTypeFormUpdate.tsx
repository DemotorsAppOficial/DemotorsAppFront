import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSync } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadComponent from '../../../components/Load/LoadComponent';
import { EmployeeTypeModel } from '../../../models/employeeTypeModel';
import { updateEmployeeType } from '../../../services/employeeTypeService/employeeTypeService';

const EmployeeTypeFormUpdate = ({
    onNewEmployeeType,
    closeModal,
    employeeType,
}: {
    onNewEmployeeType: (newEmployeeType: EmployeeTypeModel) => void;
    closeModal: () => void;
    employeeType: EmployeeTypeModel | null;
}) => {
    const [formData, setFormData] = useState<EmployeeTypeModel>({
        ID_EMPLOYEE_TYPE: 0,
        EMPLOYEE_TYPE: '',
        USER_CREATED: '',
        DATE_CREATED: '',
        USER_MODIFIED: '',
        DATE_MODIFIED: '',
        ESTATE: 'A',
    });

    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (employeeType) {
            setFormData(employeeType);
        }
    }, [employeeType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setIsTouched(true);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.EMPLOYEE_TYPE.trim()) {
            setIsTouched(true);
            return;
        }

        setLoading(true);

        try {
            const { status, message } = await updateEmployeeType(formData);
            setLoading(false);

            if (status === 'SUCCESS') {
                onNewEmployeeType(formData);
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
                toast.error('Error desconocido al actualizar el Tipo de Empleado.', {
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
                    Descripción <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    name="EMPLOYEE_TYPE" // Asegúrate de que el nombre coincida con el modelo
                    value={formData.EMPLOYEE_TYPE}
                    onChange={handleChange}
                    onBlur={() => setIsTouched(true)}
                    placeholder="Tipo de Empleado"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${isTouched && !formData.EMPLOYEE_TYPE.trim() ? 'border-red-500' : ''}`}
                    required
                />
                {isTouched && !formData.EMPLOYEE_TYPE.trim() && (
                    <p className="text-red-500 mt-1">La descripción es obligatoria.</p>
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

export default EmployeeTypeFormUpdate;
