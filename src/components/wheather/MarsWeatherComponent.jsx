import React, { useState, useEffect } from 'react';

const NASA_API_URL = 'https://api.nasa.gov/insight_weather/?api_key=w1IigHjyhCnQrSzSd129ly90aflqsEBqCeG03eW6&feedtype=json&ver=1.0';

const MarsWeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(NASA_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const renderWeather = () => {
    if (!weatherData) return <p>No data available</p>;

    if (weatherData.sol_keys.length === 0) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          <p className="text-center">No Sol data is currently available.</p>
          <p className="text-center">The validity checks indicate that the data might be missing or not yet processed.</p>
        </div>
      );
    }

    const sols = Object.keys(weatherData.sol_keys).slice(0, 7); // Get the last 7 Sols
    return sols.map((sol) => {
      const solData = weatherData[sol];
      return (
        <div key={sol} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">Sol {sol}</h3>
          <p><strong>Temperature:</strong> {solData.AT ? `${solData.AT.av} °C` : 'Data not available'}</p>
          <p><strong>Pressure:</strong> {solData.PRE ? `${solData.PRE.av} Pa` : 'Data not available'}</p>
          <p><strong>Wind Speed:</strong> {solData.HWS ? `${solData.HWS.av} m/s` : 'Data not available'}</p>
          <p><strong>Wind Direction:</strong> {solData.WD?.most_common?.compass_point || 'Data not available'}</p>
          <p><strong>Season:</strong> {solData.SEASON || 'Data not available'}</p>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">InSight Mars Weather</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">{error}</p>}

      <div className="space-y-4">
        {renderWeather()}
      </div>
    </div>
  );
};

export default MarsWeatherComponent;
