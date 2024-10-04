import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Overview from './pages/Overview';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import backgroundImage from './assets/bg-4.jpg';
import Analysis from './pages/Analysis';

const RouteConfig = () => {
  return (
    <Router>
      {/* Apply background to Navbar and main content only */}
      <div
        className="min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/analysis" element={<Analysis></Analysis>} />
          </Routes>
        </main>
      </div>
      {/* Footer without background image */}
      <Footer />
    </Router>
  );
};

export default RouteConfig;
