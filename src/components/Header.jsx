import React, { useContext } from 'react';
import { BriefcaseIcon, UserIcon } from './icons';
import { AuthContext } from '../context/AuthContext';

const Header = ({ onLoginClick, onLogout, onJobsClick, onCompaniesClick, onAboutClick, onHomeClick, onResumeClick }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    
    return (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">
                <button onClick={onHomeClick} className="flex items-center hover:text-indigo-700 transition duration-300">
                    <BriefcaseIcon />
                    <span>Career Bridge</span>
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={onHomeClick} className="text-gray-700 hover:text-blue-600">Home</button>
                <button onClick={onJobsClick} className="text-gray-700 hover:text-blue-600">Jobs</button>
                <button onClick={onCompaniesClick} className="text-gray-700 hover:text-blue-600">Companies</button>
                <button onClick={onAboutClick} className="text-gray-700 hover:text-blue-600">About</button>
                <button onClick={onResumeClick} className="text-gray-700 hover:text-blue-600">Resume</button>
                {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center text-indigo-600">
                            <UserIcon className="w-5 h-5 mr-1" />
                            <span className="text-sm font-medium">{user?.name || 'User'}</span>
                        </div>
                        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button onClick={onLoginClick} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                        Login / Sign Up
                    </button>
                )}
            </div>
        </nav>
    </header>
);
};

export default Header;