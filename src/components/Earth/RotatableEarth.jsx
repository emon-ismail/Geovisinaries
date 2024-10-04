import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import './RotatableEarth.css';  // Import your CSS file

const Earth = ({ onPointerOver, onPointerOut, scale }) => {
  const [colorMap, normalMap, specularMap] = useTexture([
    'earth-4.jpg', // Earth texture
    'small-map.jpg',   // Normal map for realism
    'shine.png',   // Specular map for shininess
  ]);

  const earthRef = useRef();

  // Rotate the Earth continuously
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005; // Slower rotation speed
    }
  });

  return (
    <mesh
      ref={earthRef}
      scale={scale}  // Apply dynamic scale based on device
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={colorMap}
        normalMap={normalMap}
        specularMap={specularMap}
        specular={new THREE.Color('white')}
        shininess={200}
      />
    </mesh>
  );
};

const Satellite = () => {
  return (
    <sprite scale={[0.9, 0.9, 0.9]} position={[0.9, 3.1, 0.3]}>
      <spriteMaterial map={new THREE.TextureLoader().load('satellite.png')} />
    </sprite>
  );
};

const WeatherWidget = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data from wttr.in for the given latitude and longitude
    fetch(`https://wttr.in/${latitude},${longitude}?format=%C|%t|%P|%h|%w`)
      .then((response) => response.text())
      .then((data) => {
        const weatherParts = data.split("|");

        // Ensure that the weather data is parsed correctly
        if (weatherParts.length === 5) {
          const [condition, temperature, precipitation, humidity, wind] = weatherParts;
          setWeatherData({
            condition: condition.trim(),
            temperature: temperature.trim(),
            precipitation: precipitation.trim(),
            humidity: humidity.trim(),
            wind: wind.trim()
          });
        } else {
          setError('Error parsing weather data');
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data');
      });
  }, [latitude, longitude]);

  return (
    <div className="absolute p-md-4 p-2 rounded-lg flex flex-col items-center text-center container"
         style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {error && <p>{error}</p>}
      {!error && !weatherData && <p>Loading weather data...</p>}
      {weatherData && (
        <>
          {/* <h3 className="text-lg font-bold">Your Location</h3> */}
          <p className="text-3xl">{weatherData.temperature}</p>
          <p>{weatherData.condition}</p>
          <p>Precipitation: {weatherData.precipitation}</p>
          <p>Humidity: {weatherData.humidity}</p>
          <p>Wind: {weatherData.wind}</p>
        </>
      )}
    </div>
  );
};

const RotatableEarth = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set up latitude and longitude based on your actual location
  const latitude = 38.89511;   // Example: Washington, D.C. latitude
  const longitude = -77.03637; // Example: Washington, D.C. longitude

  // Detect if the user is on a mobile device
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/mobile|android|iphone|ipad|tablet/.test(userAgent));
  }, []);

  // Simulate loading time (you can replace this with the actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="earth-container relative w-full h-[300px] md:h-[600px]"> {/* Responsive height */}
      <div className="dotted-circle"></div> {/* CSS Dotted Circle */}
      
      {isLoading ? (
        <div className="flex-1 w-full md:w-auto mt-8 lg:mt-0 flex items-center justify-center">
              <div className="border-gray-300 h-20 text-center w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
      ) : (
        <>
          {/* Three.js Canvas for Rotating Earth */}
          <Canvas style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={2.3} />
            <pointLight position={[10, 10, 10]} intensity={3.9} />
            <Suspense fallback={null}>
              <Earth
                scale={isMobile ? [2.5, 2.5, 2.5] : [2.5, 2.5, 2.5]}  // Smaller scale for mobile
                onPointerOver={() => !isMobile && setIsMobile(true)}
                onPointerOut={() => !isMobile && setIsMobile(false)}
              />
              <Satellite />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              minDistance={isMobile ? 4 : 3}  // Adjust min distance for mobile
              maxDistance={12}
              enableRotate={true}
            />
          </Canvas>

          {/* Weather Widget */}
          <WeatherWidget latitude={latitude} longitude={longitude} />

          {/* Countdown Widget 1 - Bottom Left on the Globe */}
          <div className="absolute p-4 rounded-lg text-center container"
               style={{ bottom: '30%', left: '30%', transform: 'translate(-50%, 0)', width: '', color: '' }}>
            <h3 className="text-sm font-semibold">LANDSAT-8 COUNTDOWN</h3>
            <div className="text-xl">03:49:18</div>
          </div>

          {/* Countdown Widget 2 - Bottom Right on the Globe */}
          <div className="absolute p-4 rounded-lg text-center container"
               style={{ bottom: '30%', right: '30%', transform: 'translate(50%, 0)', width: '',  color: '' }}>
            <h3 className="text-sm font-semibold">LANDSAT-8 COUNTDOWN</h3>
            <div className="text-xl">03:49:18</div>
          </div>
        </>
      )}
    </div>
  );
};

export default RotatableEarth;
