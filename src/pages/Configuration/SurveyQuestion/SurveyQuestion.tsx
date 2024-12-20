import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEdit, faFilePdf, faSave, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { pdf } from '@react-pdf/renderer';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '../../../css/grids.css';
import Modal from '../../../components/Modal/ModalComponent';
import { Question } from '../../../models/questioModel';
import LoadComponent from '../../../components/Load/LoadComponent';
import { formatFecha } from '../../../utils/utils';
import { convertImageToBase64, MyDocument } from '../../../hooks/usePDFCrudsDocument';
import Logo from '../../../images/logo/demotors_logo.png';
import { getQuestions } from '../../../services/questionService/questionService';
import SurveyQuestionForm from './SurveyQuestionForm';
import SurveyQuestionFormUpdate from './SurveyQuestionFormUpdate';
import SurveyQuestionFormDelete from './SurveyQuestionFormDelete';

const TABS = [
    { label: 'Todos', value: 'all' },
    { label: 'Activos', value: 'active' },
    { label: 'Inactivos', value: 'inactive' }
];

const SurveyQuestion: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [question, setQuestion] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    // IMPRESIÓN PDF //
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const openUpdateModal = (question: Question) => {
        setSelectedQuestion(question);
        setUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedQuestion(null);
    };

    const openDeleteModal = (question: Question) => {
        setSelectedQuestion(question);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedQuestion(null);
    };

    const fetchQuestions = async () => {
        try {
            const result = await getQuestions();
            setQuestion(result);
        } catch (error) {
            console.error('Error al obtener las Preguntas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleNewQuestion = async () => {
        await fetchQuestions();
    };

    const handleUpdateQuestion = async () => {
        await fetchQuestions();
        closeUpdateModal();
    };

    const handleDeleteQuestion = async () => {
        await fetchQuestions();
        closeDeleteModal();
    };

    const filteredQuestion = question.filter((question) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'active') return question.ESTATE === 'A';
        if (activeTab === 'inactive') return question.ESTATE === 'I';
        return true;
    });

    const columnDefs: ColDef<Question>[] = [
        { field: 'QUESTION', headerName: 'PREGUNTA', resizable: true, filter: true, wrapHeaderText: true, autoHeight: true, cellStyle: { whiteSpace: 'break-spaces', } },
        {
            field: 'ESTATE',
            headerName: 'ESTADO',
            cellRenderer: (params: { value: any }) => (
                <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${params.value === 'A'
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                        }`}
                >
                    {params.value === 'A' ? 'ACTIVO' : 'INACTIVO'}
                </p>
            )
        },
        { field: 'USER_CREATED', headerName: 'CREADO POR', filter: true, wrapHeaderText: true },
        { field: 'DATE_CREATED', headerName: 'FECHA CREACIÓN', valueFormatter: (params) => formatFecha(params.value), wrapHeaderText: true },
        { field: 'USER_MODIFIED', headerName: 'MODIFICADO POR', filter: true, wrapHeaderText: true },
        {
            field: 'DATE_MODIFIED',
            headerName: 'FECHA MODIFICACIÓN',
            valueFormatter: (params) => formatFecha(params.value),
            wrapHeaderText: true,
        },
        {
            headerName: 'ACCIONES',
            cellRenderer: (params: { data: Question }) => (
                <div className="items-start">
                    <button
                        title='Editar'
                        className='rounded-md py-1 px-3 mr-2 text-sm bg-warning text-white bg-opacity-90'
                        onClick={() => openUpdateModal(params.data)}
                        disabled={params.data.ESTATE === 'I'}
                    >
                        <FontAwesomeIcon icon={faEdit} style={{ marginTop: '5px' }} />
                    </button>
                    <button
                        title='Eliminar'
                        className='rounded-md py-1 px-3 ml-2 text-sm bg-danger text-white bg-opacity-90'
                        onClick={() => openDeleteModal(params.data)}
                        disabled={params.data.ESTATE === 'I'}
                    >
                        <FontAwesomeIcon icon={faTrash} style={{ marginTop: '5px' }} />
                    </button>
                </div>
            )
        },
    ];
    const formattedData = question.map(question => {
        return {
            EMPLOYEE_TYPE: { value: question.QUESTION, description: "PREGUNTA" },
            USER_CREATED: { value: question.USER_CREATED, description: "CREADO POR" },
            DATE_CREATED: { value: formatFecha(question.DATE_CREATED), description: "FECHA CREACIÓN" },
            USER_MODIFIED: { value: question.USER_MODIFIED, description: "MODIFICADO POR" },
            DATE_MODIFIED: { value: formatFecha(question.DATE_MODIFIED), description: "FECHA MODIFICACIÓN" },
            ESTATE: {
                value: question.ESTATE === 'A' ? 'ACTIVO' : 'INACTIVO',
                description: "ESTADO"
            },
        };
    });

    const handlePrint = async () => {
        setIsGeneratingPDF(true);
        try {
            const logoBase64 = await convertImageToBase64(Logo);
            const document = <MyDocument logoBase64={logoBase64 || ""} title="Preguntas de Encuesta" data={formattedData} />;
            const pdfBlob = await pdf(document).toBlob();
            const url = URL.createObjectURL(pdfBlob);

            const link = (window.document as Document).createElement('a');
            link.href = url;
            link.download = 'pregunta_encuesta.pdf';
            link.click();
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Preguntas de Encuesta" />

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

                <div className="relative">
                    <button
                        className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                        type="button"
                        onClick={() => setOpen(!open)}
                    >
                        Descargar &nbsp;
                        <FontAwesomeIcon icon={faDownload} style={{ marginTop: '5px' }} />
                    </button>

                    {open && (
                        <div className="absolute dark:bg-boxdark dark:text-white right-0 mt-2 w-48 rounded-md bg-white  z-9999">
                            <div className="py-1">
                                <button
                                    disabled={isGeneratingPDF}
                                    onClick={handlePrint}

                                    className="block px-4 py-2 text-sm hover:bg-gray-100">
                                    Descargar PDF &nbsp;
                                    {isGeneratingPDF ? <LoadComponent /> : <FontAwesomeIcon icon={faFilePdf} />}
                                </button>
                                <button className="block px-4 py-2 text-sm  hover:bg-gray-100">
                                    Descargar Excel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="w-full md:w-max flex gap-4 border-b-2 border-gray-200">
                    {TABS.map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => setActiveTab(value)}
                            className={`relative py-2 px-4 transition-all duration-300 ${activeTab === value
                                ? 'text-primary font-bold'
                                : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            {label}
                            {activeTab === value && (
                                <span className="absolute left-0 right-0 bottom-0 h-1 bg-primary rounded-t-lg animate-slideIn"></span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-4" />
                </div>
            </div>

            <div className="mt-5">
                {loading ? (
                    <LoadComponent />
                ) : (
                    <div className="ag-theme-quartz" style={{ height: 400 }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={filteredQuestion.filter(question =>
                                question.QUESTION.toLowerCase().includes(searchText.toLowerCase())
                            )}
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
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Agregar Pregunta"
                content={<SurveyQuestionForm closeModal={closeModal} onNewQuestion={handleNewQuestion} />}
                onClose={closeModal}
            />

            <Modal
                isOpen={isUpdateModalOpen}
                title="Editar Pregunta"
                content={
                    <SurveyQuestionFormUpdate
                        closeModal={closeUpdateModal}
                        onNewQuestion={handleUpdateQuestion}
                        question={selectedQuestion}
                    />
                }
                onClose={closeUpdateModal}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                title="Eliminar Pregunta"
                content={
                    <SurveyQuestionFormDelete
                        closeModal={closeDeleteModal}
                        onNewQuestion={handleDeleteQuestion}
                        question={selectedQuestion}
                    />
                }
                onClose={closeDeleteModal}
            />
        </>
    );
};

export default SurveyQuestion;
