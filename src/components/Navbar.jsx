import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import img from '../../public/global.svg'; // Adjust the path as needed

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // State to handle dropdown visibility

    return (
        <nav className="shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-2xl font-bold text-white">
                            <img className='w-40 h-50' src="/src/assets/logo.png" alt="" srcset="" />
                        </NavLink>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center">
                        <NavLink to="/" className="text-white hover:text-blue-500">
                            HOME
                        </NavLink>
                        <NavLink to="/overview" className="text-white hover:text-blue-500">
                        OVERVIEW
                        </NavLink>
                        <NavLink to="/analysis" className="text-white hover:text-blue-500">
                            ANALYSIS
                        </NavLink>
                        <NavLink to="/about" className="text-white hover:text-blue-500">
                            ABOUT US
                        </NavLink>
                    </div>
                    <div className="hidden md:flex items-center space-x-2">
                        {/* Globe icon with input dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="text-white hover:text-blue-500 focus:outline-none"
                            >
                              {/* <GlobalIcon  /> */}
                            {/* <div>  {img} </div> */}
                            <img  className="w-6 h-6" src={img} alt="" />
                            </button>
                            {searchOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-gray-800 p-2">
                                    <input
                                        type="text"
                                        placeholder="Search location"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <a href="#" className="block mt-2 text-sm hover:bg-gray-200 px-2 py-1 rounded">
                                        Your location
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-blue-500 focus:outline-none focus:text-blue-500"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <NavLink
                        to="/"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-200"
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to="/overview"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-200"
                    >
                        OVERVIEW
                    </NavLink>
                    <NavLink
                        to="/analysis"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-200"
                    >
                        ANALYSIS
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-200"
                    >
                        ABOUT US
                    </NavLink>
                    <div className="block px-4 py-2 text-sm text-white">
                        <button 
                            className="text-white hover:text-blue-500 focus:outline-none"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                               <img  className="w-6 h-6" src={img} alt="" />
                        </button>
                        {searchOpen && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Search location"
                                    className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <a href="#" className="block mt-2 text-sm hover:bg-gray-200 px-2 py-1 rounded">
                                    Your location
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
