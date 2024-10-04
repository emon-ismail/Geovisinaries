import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = { lat: -3.745, lng: -38.523 };

const MapComponent = () => {
  const [center, setCenter] = useState(initialCenter);
  const [locations, setLocations] = useState([initialCenter]);
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(newLocation);
      setLocations([...locations, newLocation]);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD7IhswuBuJekEjZy4x5isby5_hhmJGAtw" libraries={['places']}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search for a location"
          className="input-style"
          style={{
            width: '100%',
            color:'black',
            padding: '10px',
            marginBottom: '10px',
            boxSizing: 'border-box',
          }}
        />
      </Autocomplete>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
