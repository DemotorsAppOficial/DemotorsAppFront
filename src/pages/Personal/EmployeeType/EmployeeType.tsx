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
import EmployeeTypeForm from './EmployeeTypeForm';
import EmployeeTypeFormUpdate from './EmployeeTypeFormUpdate';
import { EmployeeTypeModel } from '../../../models/employeeTypeModel';
import { getEmployeeTypes } from '../../../services/employeeTypeService/employeeTypeService';
import LoadComponent from '../../../components/Load/LoadComponent';
import { formatFecha } from '../../../utils/utils';
import EmployeeTypeFormDelete from './EmployeeTypeFormDelete';
import { convertImageToBase64, MyDocument } from '../../../hooks/usePDFCrudsDocument';
import Logo from '../../../images/logo/demotors_logo.png';

const TABS = [
  { label: 'Todos', value: 'all' },
  { label: 'Activos', value: 'active' },
  { label: 'Inactivos', value: 'inactive' }
];

const EmployeeType: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeTypeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<EmployeeTypeModel | null>(null);

  // IMPRESIÓN PDF //
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openUpdateModal = (employeeType: EmployeeTypeModel) => {
    setSelectedEmployeeType(employeeType);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedEmployeeType(null);
  };

  const openDeleteModal = (employeeType: EmployeeTypeModel) => {
    setSelectedEmployeeType(employeeType);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedEmployeeType(null);
  };

  const fetchEmployeeTypes = async () => {
    try {
      const result = await getEmployeeTypes();
      setEmployeeTypes(result);
    } catch (error) {
      console.error('Error al obtener los Tipos de Empleado:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const handleNewEmployeeType = async () => {
    await fetchEmployeeTypes();
  };

  const handleUpdateEmployeeType = async () => {
    await fetchEmployeeTypes();
    closeUpdateModal();
  };

  const handleDeleteEmployeeType = async () => {
    await fetchEmployeeTypes();
    closeDeleteModal();
  };

  const filteredEmployeeTypes = employeeTypes.filter((employee) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return employee.ESTATE === 'A';
    if (activeTab === 'inactive') return employee.ESTATE === 'I';
    return true;
  });

  const columnDefs: ColDef<EmployeeTypeModel>[] = [
    {
        field: 'EMPLOYEE_TYPE',
        headerName: '',
        cellRenderer: (params: { value: any; }) => (
            <div className="flex items-center justify-center mt-1 border border-stroke bg-green-700 w-8 h-8 rounded">
                <span className="font-semibold text-white">
                    {params.value.charAt(0).toUpperCase()}
                </span>
            </div>
        ),
    },
    { field: 'EMPLOYEE_TYPE', headerName: 'DESCRIPCIÓN', filter: true, wrapHeaderText: true },
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
      cellRenderer: (params: { data: EmployeeTypeModel }) => (
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
const formattedData = employeeTypes.map(employeeType => {
  return {
      EMPLOYEE_TYPE: { value: employeeType.EMPLOYEE_TYPE, description: "TIPO DE EMPLEADO" },
      USER_CREATED: { value: employeeType.USER_CREATED, description: "CREADO POR" },
      DATE_CREATED: { value: formatFecha(employeeType.DATE_CREATED), description: "FECHA CREACIÓN" },
      USER_MODIFIED: { value: employeeType.USER_MODIFIED, description: "MODIFICADO POR" },
      DATE_MODIFIED: { value: formatFecha(employeeType.DATE_MODIFIED), description: "FECHA MODIFICACIÓN" },
      ESTATE: { 
        value: employeeType.ESTATE === 'A' ? 'ACTIVO' : 'INACTIVO',
        description: "ESTADO" 
      },  };
});

const handlePrint = async () => {
  setIsGeneratingPDF(true);
  try {
      const logoBase64 = await convertImageToBase64(Logo);
      const document = <MyDocument logoBase64={logoBase64 || ""}  title="Tipo de Empleado"  data={formattedData} />;
      const pdfBlob = await pdf(document).toBlob();
      const url = URL.createObjectURL(pdfBlob);

      const link = (window.document as Document).createElement('a');
      link.href = url;
      link.download = 'tipo_empleado.pdf';
      link.click();
  } catch (error) {
      console.error("Error generating PDF:", error);
  } finally {
      setIsGeneratingPDF(false);
  }
};

  return (
    <>
      <Breadcrumb pageName="Tipo de Empleado" />

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
              rowData={filteredEmployeeTypes.filter(employee =>
                employee.EMPLOYEE_TYPE.toLowerCase().includes(searchText.toLowerCase())
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
        title="Agregar Tipo de Empleado"
        content={<EmployeeTypeForm closeModal={closeModal} onNewEmployeeType={handleNewEmployeeType} />}
        onClose={closeModal}
      />

      <Modal
        isOpen={isUpdateModalOpen}
        title="Editar Tipo de Empleado"
        content={
          <EmployeeTypeFormUpdate
            closeModal={closeUpdateModal}
            onNewEmployeeType={handleUpdateEmployeeType}
            employeeType={selectedEmployeeType}
          />
        }
        onClose={closeUpdateModal}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        title="Eliminar Tipo de Empleado"
        content={
          <EmployeeTypeFormDelete
            closeModal={closeDeleteModal}
            onNewEmployeeType={handleDeleteEmployeeType}
            employeeType={selectedEmployeeType}
          />
        }
        onClose={closeDeleteModal}
      />
    </>
  );
};

export default EmployeeType;
