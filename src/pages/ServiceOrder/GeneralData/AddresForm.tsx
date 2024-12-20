import React, { useState } from 'react';
import LocationSearch from '../Location/LocationSearch';

const AddressForm: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  const handleLocationSelect = (selectedLocation: { lat: number; lng: number; address: string }) => {
    setLocation(selectedLocation);
  };

  return (
    <div className="p-4">
      <LocationSearch onLocationSelect={handleLocationSelect} />
      {location && (
        <div>
          <p>Latitud: {location.lat}</p>
          <p>Longitud: {location.lng}</p>
          <p>Dirección: {location.address}</p>
        </div>
      )}
    </div>
  );
};

export default AddressForm;