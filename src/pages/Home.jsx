import React from 'react';
import Header from '../components/Header/Header';
import Overview from '../pages/Overview';
import Analysis from './Analysis';
import WeatherComponent from '../components/wheather/WeatherComponent';
import MarsWeatherComponent from '../components/wheather/MarsWeatherComponent';
import NotificationsComponent from '../components/wheather/NotificationsComponent';
import LocationDisplay from '../components/wheather/LocationDisplay';
import LocationInput from '../components/wheather/LocationInput';
import GeoVisionaries from '../components/Earth/GeoVisionaries';
// import MapComponent from '../components/Map/MapComponent';
// import RotatableEarth from '../components/Earth/RotatableEarth';

const Home = () => {
  return(
    <div className="  px-4">
      {/* <RotatableEarth></RotatableEarth> */}
   <Header></Header>
   {/* <MapComponent></MapComponent> */}
   {/* <GeoVisionaries></GeoVisionaries> */}
<LocationInput></LocationInput>
   <LocationDisplay></LocationDisplay>
   <WeatherComponent></WeatherComponent>
<NotificationsComponent></NotificationsComponent>
   <MarsWeatherComponent></MarsWeatherComponent>
   <Overview></Overview>
   <Analysis></Analysis>
   
  </div>
  ) 
  
};

export default Home;
