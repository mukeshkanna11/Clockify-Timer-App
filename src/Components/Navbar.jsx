import React from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => (
    <nav className="flex items-center justify-between p-4 bg-blue-700 shadow-lg">
        {/* Sidebar toggle button for mobile screens */}
        <button onClick={toggleSidebar} className="text-white lg:hidden">
            <FaBars size={24} />
        </button>

        <h1 className="text-lg font-semibold tracking-wide text-white font-poppins">My Workspaces</h1>

        <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-200">Welcome!</span>
        </div>
    </nav>
);

export default Navbar;
