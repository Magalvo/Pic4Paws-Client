import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Ping from '../assets/images/'

const LocationMap = ({ lat, lng }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [center, setCenter] = useState(null);
  const [marker, setMarker] = useState(null);

  const mapContainerStyle = {
    height: '400px',
    width: '100%'
  };

  console.log(lat, lng);
  // Set the center once valid lat and lng are available
  useEffect(() => {
    if (lat && lng) {
      setCenter({ lat: lat, lng: lng });
      setMarker({ lat: lat, lng: lng });
      setMapLoaded(true);
    }
  }, [lat, lng]);

  // Check if the map is loaded and location is available before rendering the map and marker
  if (!mapLoaded || !center) {
    return null;
  }

  const customMarkerIcon = {
    url: 
    scaledSize: new window.google.maps.Size(40, 40) // Adjust the size of the custom marker
  };

  return (
    <LoadScript
      googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_API}&callback=initMap`}
      libraries={['places']}
    >
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
        >
          <Marker position={marker} icon={customMarkerIcon} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LocationMap;
