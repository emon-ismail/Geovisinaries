import React from 'react';
import LocationInput from './LocationInput';

const ParentComponent = () => {
  // Define the function to handle location selection
  const handleLocationSelect = (location) => {
    console.log('Location selected:', location);
    // Implement logic to handle the selected location
  };

  return (
    <div>
      <LocationInput onLocationSelect={handleLocationSelect} />
    </div>
  );
};

export default ParentComponent;
