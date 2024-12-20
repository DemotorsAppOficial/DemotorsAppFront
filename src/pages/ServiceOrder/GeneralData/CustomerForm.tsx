import DatePickerOne from '../../../components/Forms/DatePicker/DatePickerOne';
import { faAddressCard, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { setName, setAttentionTo, setEmail, setAddress, setPhone, setNit } from '../../../redux/slices/customerFormSlice';
import AddressForm from './AddresForm';
import Modal from '../../../components/Modal/ModalComponent';
import React, { FormEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import servicesOrderRequest from '../../../hooks/servicesOrderRequest';

const CustomerForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { name, attentionTo, email, address, phone, nit } = useSelector((state: RootState) => state.customerForm);

  const { postClient } = servicesOrderRequest()

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { servicesOrder } = useParams()

  console.log('servicesOrder => ', servicesOrder)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'attentionTo':
        dispatch(setAttentionTo(value));
        break;
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'address':
        dispatch(setAddress(value));
        break;
      case 'phone':
        dispatch(setPhone(value));
        break;
      case 'nit':
        dispatch(setNit(value));
        break;
    }
  };

  const handleReturnGeneralPage = () => {
    navigate('/services-order/general')
  }

  const handleSubmitClient = () => {
      postClient()
      navigate('/services-order/general')
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          <FontAwesomeIcon icon={faAddressCard} /> &nbsp; Datos del Cliente
        </h3>
      </div>
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className='w-full xl:w-1/2'>
            <label className="mb-2.5 block text-black dark:text-white">
              Cliente <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nombre del Cliente"
              value={name}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Correo Electrónico <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Atención A <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="attentionTo"
                placeholder="Atención a"
                value={attentionTo}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div> */}

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Dirección <span className="text-meta-1">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Dirección Cliente"
                  value={address}
                  onChange={handleChange}
                  className="flex-grow rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition"
                  aria-label="Agregar Dirección"
                  title="Agregar Dirección"
                  onClick={openModal}
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                </button>
              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <DatePickerOne />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Teléfonos <span className="text-meta-1">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono del Cliente"
                value={phone}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                NIT <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="nit"
                placeholder="NIT del Cliente"
                value={nit}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
            onClick={handleSubmitClient}
          >
            Guardar
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        title="Ingrese la Ubicación"
        content={<AddressForm />}
        onClose={closeModal}
      />
    </div>
  );
};

export default CustomerForm;
