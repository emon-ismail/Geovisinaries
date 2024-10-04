import React from 'react';
import globeImage from './../../../public/normal.png'; // Assuming the image is in public folder
import satelliteImage from './../../../public/satellite.png';

const GeoVisionaries = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center h-screen w-full bg-black text-white">
      {/* Globe and Elements */}
      <div className="relative lg:w-1/2 flex justify-center items-center">
        {/* Globe Image */}
        <img
          src={globeImage}  // imported image
          alt="Globe"
          className="h-96 w-96 md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] rounded-full object-cover"
        />
        {/* Circular Dotted Line */}
        <div className="absolute border-2 border-dotted border-white rounded-full h-[500px] w-[500px] md:h-[600px] md:w-[600px] lg:h-[700px] lg:w-[700px]"></div>

        {/* Satellite Icon (orbiting effect) */}
        <div className="absolute satellite h-12 w-12 animate-spin-slow" style={{ top: '10%', left: '85%' }}>
          <img src={satelliteImage} alt="Satellite" className="h-full w-full"/>
        </div>

        {/* Weather Widget Positioned on the Globe */}
        <div className="absolute container p-4 rounded-lg flex flex-col items-center text-center"
             style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '250px' }}>
          <h3 className="text-lg font-bold">Washington, D.C.</h3>
          <p className="text-3xl">22°C</p>
          <p>Precipitation: 0%</p>
          <p>Humidity: 48%</p>
          <p>Wind: 14 km/h</p>
        </div>

        {/* Countdown Widget 1 - Bottom Left on the Globe */}
        <div className="absolute container p-4 rounded-lg text-center"
             style={{ bottom: '30%', left: '30%', transform: 'translate(-50%, 0)', width: '200px' }}>
          <h3 className="text-sm font-semibold">LANDSAT-8 COUNTDOWN</h3>
          <div className="text-xl">03:49:18</div>
        </div>

        {/* Countdown Widget 2 - Bottom Right on the Globe */}
        <div className="absolute container p-4 rounded-lg text-center"
             style={{ bottom: '30%', right: '30%', transform: 'translate(50%, 0)', width: '200px' }}>
          <h3 className="text-sm font-semibold">LANDSAT-8 COUNTDOWN</h3>
          <div className="text-xl">03:49:18</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 text-center lg:text-left p-4 space-y-4">
        <h1 className="text-4xl lg:text-6xl font-extrabold">GEOVISIONARIES</h1>
        <p className="text-sm lg:text-lg max-w-md">
          Landsat satellites are a series of Earth-observing satellites that
          have been capturing images of our planet since 1972.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center lg:justify-start">
          <input
            type="text"
            className="p-3 w-64 rounded-l-lg border border-white bg-white text-black"
            placeholder="Washington, D.C. USA"
          />
          <button className="bg-blue-500 p-3 rounded-r-lg text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoVisionaries;
