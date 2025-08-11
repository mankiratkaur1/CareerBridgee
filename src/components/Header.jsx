import React from 'react';
import { BriefcaseIcon } from './icons';

const Header = ({ onLoginClick, onLogoutClick, isLoggedIn, onJobsClick, onCompaniesClick, onAboutClick, onHomeClick }) => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">
                <button onClick={onHomeClick} className="flex items-center hover:text-indigo-700 transition duration-300">
                    <BriefcaseIcon />
                    <span>Career Bridge</span>
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={onJobsClick} className="text-gray-600 hover:text-indigo-600 transition duration-300">Jobs</button>
                <button onClick={onCompaniesClick} className="text-gray-600 hover:text-indigo-600 transition duration-300">Companies</button>
                <button onClick={onAboutClick} className="text-gray-600 hover:text-indigo-600 transition duration-300">About</button>
                {isLoggedIn ? (
                    <button onClick={onLogoutClick} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                        Logout
                    </button>
                ) : (
                    <button onClick={onLoginClick} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                        Login / Sign Up
                    </button>
                )}
            </div>
        </nav>
    </header>
);

export default Header;