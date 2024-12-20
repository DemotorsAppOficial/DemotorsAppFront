import { useDispatch, useSelector } from 'react-redux';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState, AppDispatch } from '../../../redux/store';
import { setAnswer } from '../../../redux/slices/serviceFormSlice';
import { useState, useEffect } from 'react';
import LoadComponent from '../../../components/Load/LoadComponent';
import { ServiceModel } from '../../../models/serviceModel';
import { getServices } from '../../../services/serviceService/serviceService';

const ServiceForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const answers = useSelector((state: RootState) => state.serviceForm.answers);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getServices();
        setServices(result);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 1000);
      }
    };
    fetchServices();
  }, []);

  const handleCheckboxChange = (serviceId: number, serviceDescription: string, isChecked: boolean) => {
    dispatch(setAnswer({ serviceId, serviceDescription, answer: isChecked ? 'Yes' : 'No' }));
  };

  if (loading || !showContent) return <LoadComponent />;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          <FontAwesomeIcon icon={faGear} /> &nbsp; Servicio Solicitado
        </h3>
      </div>
      <form action="#">
        <div className="p-6.5 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services
            .filter((service) => service.STATE === 'A')
            .map((service) => (
              <div key={service.ID_SERVICE} className="question-item">
                <label
                  htmlFor={`checkbox-${service.ID_SERVICE}`}
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`checkbox-${service.ID_SERVICE}`}
                      className="sr-only"
                      checked={answers[service.ID_SERVICE]?.answer === 'Yes'}
                      onChange={(e) => handleCheckboxChange(service.ID_SERVICE, service.SERVICE_DESCRIPTION, e.target.checked)}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        answers[service.ID_SERVICE]?.answer === 'Yes' ? 'border-primary bg-gray dark:bg-transparent' : ''
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-sm ${
                          answers[service.ID_SERVICE]?.answer === 'Yes' ? 'bg-primary' : ''
                        }`}
                      ></span>
                    </div>
                  </div>
                  <span className="text-black dark:text-white">
                    {service.SERVICE_DESCRIPTION}
                  </span>
                </label>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
