import { useSearchParams } from "react-router-dom"
import { UploadImageModel } from "../../models/UploadImageModel"
import { useState } from "react"
import LoadComponent from "../../components/Load/LoadComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCancel, faFileAlt } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const UploadImageForm = ({ closeModal, loading, servicesOrder }: { closeModal: () => void, loading: (valor: boolean) => void, servicesOrder: any }) => {
    const [image, setImage] = useState(null)

    const handleOnChangeImage = async (event: any) => {
        const file = event.target.files[0]
        setImage(file)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!image) {
            alert('Por favor selecciona una imagen primero.');
            return;
        }
        const formData = new FormData()
        formData.append('image', image)
        formData.append('idServiceOrder', servicesOrder)
        try {
            loading(true)
            const response = await axios.post('http://localhost:3200/api/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Respuesta => ', response)
            closeModal()
        } catch (e) {
            console.log('ERROR:: => ', e)
        } finally {
            loading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Imagen <span className="text-meta-1">*</span>
                </label>
                <input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => handleOnChangeImage(e)}
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Descripción <span className="text-meta-1">*</span>
                </label>
                <input
                    type="text"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    required
                />
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
                    Guardar &nbsp;
                    <FontAwesomeIcon icon={faFileAlt} style={{ marginTop: '5px' }} />
                </button>
            </div>
        </form>
    )
}

export default UploadImageForm;