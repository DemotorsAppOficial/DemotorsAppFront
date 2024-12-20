import React, { useState } from 'react';
import { EquipmentSerieModel } from '../../../models/equipmentSerieModel';
import LoadComponent from '../../Load/LoadComponent';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setIdSerie } from '../../../redux/slices/equipamentFormSlice';

const SelectSerie: React.FC<{ equipmentSeries: EquipmentSerieModel[], loading: boolean }> = ({ equipmentSeries, loading }) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [serieSelected, setSerieSelected] = useState<number>(0)

  const dispatch = useDispatch<AppDispatch>();

  if (loading) return <LoadComponent />;

  const changeTextColor = (e: any) => {
    const { target } = e
    setIsOptionSelected(true);
    dispatch(setIdSerie(parseInt(target.value)))
  };

  return (
    <div className="w-full">
      <label className="mb-3 block text-black dark:text-white">
        Serie
      </label>

      <div className="relative w-full z-20 bg-white dark:bg-form-input">
        <select
          onChange={(e) => {
            changeTextColor(e);
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
            }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Serie del Equipo
          </option>

          {equipmentSeries.map((equipmentSerie) => (
            <option key={equipmentSerie.ID_SERIE} value={equipmentSerie.ID_SERIE} className="text-body dark:text-bodydark">
              {equipmentSerie.DESCRIPTION_SERIE}
            </option>
          ))}

        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectSerie;
