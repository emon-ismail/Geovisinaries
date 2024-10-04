import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import Lottie from 'lottie-react';
import spaceAnimation from '../../assets/astro.json';
import backgroundImage from '../../assets/bg-2.jpg';
import RotatableEarth from '../Earth/RotatableEarth';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time (you can replace this with the actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <header className="bg-dark text-white flex flex-col lg:flex-row items-center justify-between md:px-12 lg:px-24">
        
        {/* Left Side Animation */}
        <div className="flex-1 w-full md:w-auto mt-8 lg:mt-0">
          {isLoading ? (
            <div class="border-gray-300 h-20 text-center w-20 animate-spin rounded-full border-8 border-t-blue-600" />
          ) : (
            <RotatableEarth />
          )}
        </div>

        {/* Right Side Content */}
        <div className="flex-1 w-full md:w-auto">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 1 }}
          >
            GEOVISIONARIES <br />
          </motion.h1>
          <motion.p
            className="mt-4 text-base md:text-lg"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Join with us on an extraordinary journey beyond the stars.
          </motion.p>
          <motion.p
            className="mt-2 text-sm md:text-base"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore rerum nemo, consequatur quisquam voluptates tempore hic a delectus! Libero corporis sunt doloribus architecto veniam officia, voluptas consequatur facere quas!
          </motion.p>
          <motion.button
            className="mt-6 px-4 py-2 md:px-6 md:py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Join with us
          </motion.button>
        </div>
      </header>
    </div>
  );
};

export default Header;
