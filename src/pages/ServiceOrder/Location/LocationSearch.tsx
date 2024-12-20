import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<google.maps.places.PlaceResult[]>([]);

  const mapRef = useRef<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC_XFoCxYSaH0vCtdFKvTS3zQoZ0g54OLM',
    libraries: ['places'],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapLoaded(true);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          setMapLoaded(true);
        }
      );
    } else {
      console.error("Geolocalización no soportada por este navegador.");
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autoCompleteInstance = new google.maps.places.Autocomplete(inputRef.current!);
      setAutocomplete(autoCompleteInstance);

      autoCompleteInstance.addListener('place_changed', () => {
        const place = autoCompleteInstance.getPlace();

        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          if (lat !== undefined && lng !== undefined) {
            const location = {
              lat: lat,
              lng: lng,
              address: place.formatted_address || '',
            };

            setCurrentLocation({ lat: location.lat, lng: location.lng });
            onLocationSelect(location);
          }
        }
      });
    }
  }, [isLoaded, onLocationSelect]);

  const handleInputChange = () => {

    if (inputRef.current) {
      const placesService = new google.maps.places.PlacesService(mapRef.current!);
      const request: google.maps.places.FindPlaceFromQueryRequest = {
        query: inputRef.current.value,
        fields: ['place_id', 'name', 'geometry']
            };

      placesService.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setSuggestions(results);
        }
      });
    }
  };

  const handleSuggestionClick = (placeId: string) => {
    const placesService = new google.maps.places.PlacesService(mapRef.current!);

    placesService.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const location = {
          lat: lat,
          lng: lng,
          address: place.formatted_address || '',
        };

        setCurrentLocation({ lat: location.lat, lng: location.lng });
        onLocationSelect(location);
        setSuggestions([]);
      }
    });
  };

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded || !mapLoaded) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faMap} size="4x" />
          <div className="mt-4">Cargando Mapa...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar dirección"
        onChange={handleInputChange}
        className="mb-5 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion.place_id!)}
            style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
          >
            {suggestion.name || 'Lugar sin nombre'}
          </li>
        ))}
      </ul>

      {/* Mapa de Google */}
      <GoogleMap
        id="search-map"
        mapContainerStyle={{ height: '500px', width: '100%' }}
        zoom={currentLocation ? 17 : 2}
        center={currentLocation || { lat: 0, lng: 0 }}
        onLoad={(map) => { mapRef.current = map; }}
      >
        {currentLocation && (
          <MarkerF position={currentLocation} />
        )}
      </GoogleMap>
    </div>
  );
};

export default LocationSearch;
