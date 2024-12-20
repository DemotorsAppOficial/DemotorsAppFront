import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import serviceOrderForm from '../../../hooks/serviceOrderForm';
import CustomerForm from './CustomerForm';
import EquipmentForm from './EquipmentForm';
import SurveyQuestionForm from './SurveyQuestionForm';
import SignatureForm from './SignatureForm';
import ServiceForm from './ServiceForm';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

const GeneralDataForm = () => {
  const { customerForm, equipamentForm } = useSelector((state: RootState) => state);
  const forms = { customerForm, equipamentForm }
  const { step, nextStep, previousStep, isFirstStep, isLastStep } = serviceOrderForm(1, 5, forms);

  return (
    <>
      <Breadcrumb pageName="Orden de Servicio" />
      <div className="flex justify-end gap-4.5 mb-5">
        {!isFirstStep && (
          <button
            className="flex justify-center rounded bg-black py-2 px-6 font-medium text-white hover:bg-gray-500"

            onClick={previousStep}
          >
            Regresar &nbsp;
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginTop: '5px' }} />
          </button>
        )}
        {!isLastStep && (
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            onClick={nextStep}
            type="button"
          >
            Continuar &nbsp;
            <FontAwesomeIcon icon={faArrowRight} style={{ marginTop: '5px' }} />
          </button>
        )}
      </div>

      {step === 1 && <CustomerForm />}
      {step === 2 && <EquipmentForm />}
      {step === 3 && < ServiceForm/>}
      {step === 4 && < SurveyQuestionForm/>}
      {step === 5 && <SignatureForm />}
    </>
  );
};

export default GeneralDataForm;
