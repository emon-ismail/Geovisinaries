// LocationDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationDisplay = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    ip: null,
    city: null,
    region: null,
    country: null,
    org: null,
    postal: null,
    timezone: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch IP and location details
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/json?token=81d85caa80d998');
        const { ip, city, region, country, loc, org, postal, timezone } = response.data;
        const [lat, lon] = loc.split(',');

        setLocation({
          ip,
          city,
          region,
          country,
          lat,
          lon,
          org,
          postal,
          timezone,
        });
      } catch (err) {
        setError('Unable to fetch location details.');
      }
    };

    fetchLocationDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Your Location Details:</h2>
          {location.ip ? (
            <div className="text-gray-700">
              <p><strong>IP Address:</strong> {location.ip}</p>
              <p><strong>City:</strong> {location.city}</p>
              <p><strong>Region:</strong> {location.region}</p>
              <p><strong>Country:</strong> {location.country}</p>
              <p><strong>Latitude:</strong> {location.lat}</p>
              <p><strong>Longitude:</strong> {location.lon}</p>
              {/* <p><strong>Organization:</strong> {location.org}</p> */}
              <p><strong>Postal Code:</strong> {location.postal}</p>
              <p><strong>Timezone:</strong> {location.timezone}</p>
            </div>
          ) : (
            <p className="text-gray-500">Fetching location details...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;
