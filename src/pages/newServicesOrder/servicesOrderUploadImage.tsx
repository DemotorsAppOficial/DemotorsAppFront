import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { faImage, faSave } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { ColDef } from "ag-grid-community"
import { UploadImageModel } from "../../models/UploadImageModel"
import LoadComponent from "../../components/Load/LoadComponent"
import { AgGridReact } from "ag-grid-react"
import Modal from "../../components/Modal/ModalComponent"
import UploadImageForm from "./uploadImageForm"
import { getImageServices } from "../../services/ImageServicesOrderService/imageServicesOrderService"
import ViewImageServiceOrder from "./viewImageServiceOrder"
import { useParams } from "react-router-dom"

const ServicesOrderUploadImage: React.FC = () => {

    const [loading, setLoading] = useState(true)
    const [isModalOpen, setModalOpen] = useState(false)
    const [isImageModalOpen, setImageModalOpen] = useState(false)
    const [viewImage, setViewImage] = useState('')
    const [imagesServicesOrder, setImagesServicesOrder] = useState<UploadImageModel[]>([])

    const { servicesOrder } = useParams()

    console.log(servicesOrder)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    const openImageModal = (image:string) => {
        setViewImage(image)
        setImageModalOpen(true)
    }
    const closeImageModal = () => setImageModalOpen(false)

    const fetchImage = async () => {
        try {
            const result = await getImageServices(servicesOrder)
            setImagesServicesOrder(result.response)
        } catch (e) {
            console.log('Error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchImage()
        console.log('hola')
    }, [loading])

    const columnDefs: ColDef<UploadImageModel>[] = [
        /* {
            field: 'NO_ORDER',
            headerName: 'Numero de orden',
            filter: true,
            wrapHeaderText: true
        }, */
        {
            headerName: 'Imagen',
            cellRenderer: (params: { data: UploadImageModel }) => {
                const { NAME_PATH: file } = params.data
                return <div className="item-start">
                <button
                    title='Ver imagen'
                    onClick={() => openImageModal(file)}
                    className='rounded-md py-1 px-3 mr-2 text-sm bg-warning text-white bg-opacity-90'
                >
                    <FontAwesomeIcon icon={faImage} style={{ marginTop: '5px' }} />
                </button>
            </div>
            }
        },
        {
            field: 'CLIENT',
            headerName: 'Cliente',
            filter: true,
            wrapHeaderText: true
        },
        {
            field: 'ENGINE',
            headerName: 'Motor',
            filter: true,
            wrapHeaderText: true
        },
        {
            field: 'MODEL_1',
            headerName: 'Modelo 1',
            filter: true,
            wrapHeaderText: true
        },
        {
            field: 'MODEL_2',
            headerName: 'Modelo 2',
            filter: true,
            wrapHeaderText: true
        },
        {
            field: 'SERIE',
            headerName: 'Serie',
            filter: true,
            wrapHeaderText: true
        }
    ]

    return (
        <>
            <Breadcrumb pageName="Subida de Imagenes" />
            <div className="mb-8 flex items-center justify-end gap-8">
                <button
                    className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    type="button"
                    title='Agregar'
                    onClick={openModal}
                >
                    Agregar &nbsp;
                    <FontAwesomeIcon icon={faSave} style={{ marginTop: '5px' }} />
                </button>
            </div>
            <div className="mt-5">
                {
                    loading ? (
                        <LoadComponent />
                    ) : (
                        <div className="ag-theme-quartz" style={{ height: 400 }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={imagesServicesOrder}
                                pagination={true}
                                paginationPageSize={10}
                                defaultColDef={{
                                    sortable: true,
                                    resizable: false,
                                    flex: 1,
                                    minWidth: 100,
                                }}
                            />
                        </div>
                    )
                }
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Subir Imagen"
                content={<UploadImageForm closeModal={closeModal} loading={setLoading} servicesOrder={servicesOrder} />}
                onClose={closeModal}
            />

            <Modal
                isOpen={isImageModalOpen}
                title="Visualizador de imagenes"
                content={
                    <ViewImageServiceOrder
                        file={viewImage}
                    />
                }
                onClose={closeImageModal}
            />
        </>
    )
}

export default ServicesOrderUploadImage