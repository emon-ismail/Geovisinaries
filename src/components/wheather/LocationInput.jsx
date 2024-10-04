import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinates } from '../../api/geocode';

const LocationInput = ({ onLocationSelect }) => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default coordinates
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 });
  const mapRef = useRef(null); // Ref to hold the map instance

  const MapUpdater = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 13); // Adjust zoom level as needed
      }
    }, [position, map]);

    return null;
  };

  const handleAddressChange = async (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);

    if (!newAddress.trim()) {
      setError('Address cannot be empty');
      return;
    }

    try {
      console.log('Searching for address:', newAddress); // Debugging
      const { lat, lng } = await getCoordinates(newAddress);
      console.log('Fetched coordinates:', lat, lng); // Debugging
      setPosition([lat, lng]);
      setCoordinates({ lat, lng });

      if (typeof onLocationSelect === 'function') {
        onLocationSelect({ lat, lng });
      } else {
        console.error('onLocationSelect is not a function');
      }

      setError(''); // Clear any previous error
    } catch (err) {
      console.error('Error in fetching coordinates:', err); // Debugging
      setError('Unable to find location');
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    setCoordinates({ lat, lng });

    if (typeof onLocationSelect === 'function') {
      onLocationSelect({ lat, lng });
    } else {
      console.error('onLocationSelect is not a function');
    }

    setAddress(''); // Clear address after clicking on the map
    setError(''); // Clear any previous error
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={handleAddressChange}
        className="border p-2 rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="mb-4 text-white">
        <p className="font-semibold">Latitude: {coordinates.lat.toFixed(6)}</p>
        <p className="font-semibold">Longitude: {coordinates.lng.toFixed(6)}</p>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        className="h-96"
        style={{ width: '100%', height: '400px' }}
        onClick={handleMapClick}
        whenCreated={(mapInstance) => mapRef.current = mapInstance} // Set map instance
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater position={position} />
        <Marker position={position}>
          <Popup>{address || 'Selected Location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationInput;
