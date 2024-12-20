import { useState } from 'react';
import { createClient } from '../services/clientService/clientService';
import { ClientModel } from '../models/clientModel';
import { toast } from 'react-toastify';
import { EquipmentModel } from '../models/equipmentModel';
import { createEquipment } from '../services/equipmentService/equipmentService';

const serviceOrderFormStep = (initialStep = 1, totalSteps = 5, forms: any) => {
  const [step, setStep] = useState(initialStep);

  const nextStep = async () => {
    if (step < totalSteps) {
      setStep(prevStep => prevStep + 1);
      try {
        if (step === 1) {
          const { customerForm } = forms
            const { name, attentionTo, email, address, date, phone, nit } = customerForm
            const newClient: ClientModel = {
              FULL_NAME: name,
              EMAIL: email,
              ADDRESS_CLIENT: address,
              ENTRY_DATE: date,
              PHONE_NUMBER: phone,
              NIT: nit
            }
            let responseApi = await createClient(newClient)
            const { response } = responseApi
            const { message } = response
            toast.success(message, {
              autoClose: 3000,
              className: "dark:bg-boxdark dark:text-white"
            })
        } else if (step === 2) {
          const { equipamentForm } = forms
            const { motor, marca, modelo, idSerie, serie, especificaciones } = equipamentForm
            const newEquipment: EquipmentModel = {
              ENGINE: motor,
              TRADEMARK: marca,
              MODEL_1: modelo,
              MODEL_2: modelo,
              ID_SERIE: idSerie,
              EQUIPMENT_SERIE: serie,
              DESCRIPTION: especificaciones,
              DESCRIPTION_2: especificaciones
            }
            let responseApi = await createEquipment(newEquipment)
            const { response } = responseApi
            const { message } = response
            toast.success(message, {
              autoClose: 3000,
              className: "dark:bg-boxdark dark:text-white"
            })
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`Error: ${err.message}`, {
            autoClose: 3000,
            className: "dark:bg-boxdark dark:text-white"
          })
        } else {
          toast.error('Error desconocido al crear una orden de servicio', {
            autoClose: 3000,
            className : "dark:bg-boxdark dark:text-white"
        });
        }
      }
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    }
  };

  return { step, nextStep, previousStep, isFirstStep: step === 1, isLastStep: step === totalSteps };
};

export default serviceOrderFormStep;
