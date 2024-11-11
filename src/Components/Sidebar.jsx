import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegClock, FaClipboardList, FaBars } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 transition-all duration-300 z-20 ${isOpen ? 'w-64' : 'w-16'}`}>
        {/* Sidebar Header with toggle button */}
        <div className="flex items-center justify-between p-4 mb-8 text-white">
            {isOpen && <h2 className="text-2xl font-bold transition-opacity duration-300">Dashboard</h2>}
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none"
            >
                <FaBars size={20} />
            </button>
        </div>

        {/* Navigation links */}
        <ul className="space-y-4">
            <li>
                <NavLink
                    to="/timer"
                    className={({ isActive }) =>
                        `flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white'
                        }`
                    }
                >
                    <FaRegClock className="mr-3 text-xl" />
                    {isOpen && 'Timer'}
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/report"
                    className={({ isActive }) =>
                        `flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                            isActive ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white'
                        }`
                    }
                >
                    <FaClipboardList className="mr-3 text-xl" />
                    {isOpen && 'Report'}
                </NavLink>
            </li>
        </ul>

        {/* Footer */}
        <div className={`mt-auto p-4 text-sm text-gray-400 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <p>© 2024 TimerApp</p>
        </div>
    </div>
);

export default Sidebar;
