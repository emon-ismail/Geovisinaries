import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">GEOVISIONARIES</h2>
            <p className="text-sm">Exploring the universe with cutting-edge technology and research.</p>
          </div>
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Research</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>© 2024 GEOVISIONARIES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
