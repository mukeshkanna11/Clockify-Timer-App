// Components/Navbar.js
import React from 'react';

const Navbar = () => (
    <nav className="flex items-center justify-between p-4 bg-blue-700 shadow-lg">
        <h1 className="text-xl font-semibold tracking-wide text-white font-poppins">My Timer App</h1>
        <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-200">Welcome!</span>
        </div>
    </nav>
);

export default Navbar;
