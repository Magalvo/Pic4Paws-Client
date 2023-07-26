import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

  const markerOptions = {
    position: center,
    icon: {
      path: 'M7 14l5-5 5 5z',
      fillColor: '#00FF00', // Change this to modify the marker color (green in this example)
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 1.5
    }
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
          <Marker {...markerOptions} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LocationMap;
