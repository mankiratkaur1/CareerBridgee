import React from 'react';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} Career Bridge. All Rights Reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
                <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-400">Terms of Service</a>
                <a href="#" className="hover:text-indigo-400">Contact Us</a>
            </div>
        </div>
    </footer>
);

export default Footer;