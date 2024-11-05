// Components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegClock, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => (
    <div className="flex flex-col justify-between w-64 h-screen p-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div>
            <h2 className="mb-8 text-2xl font-bold text-white">Dashboard</h2>
            
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
                        Timer
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
                        Report
                    </NavLink>
                </li>
            </ul>
        </div>

        <div className="mt-6 text-sm text-gray-400">
            <p>© 2024 YourApp</p>
        </div>
    </div>
);

export default Sidebar;
