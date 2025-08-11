import React, { useState } from 'react';
import { BriefcaseIcon } from './icons';

const LoginPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`${isLoginView ? 'Logging in' : 'Signing up'}...`);
        onLoginSuccess();  
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
             <div className="text-3xl font-bold text-indigo-600 mb-6 flex items-center">
                <BriefcaseIcon />
                <span>Career Bridge</span>
            </div>
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {!isLoginView && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" id="name" type="text" placeholder="John Doe" required />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" id="password" type="password" placeholder="******************" required />
                        {isLoginView && <a className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800" href="#">Forgot Password?</a>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {isLoginView ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-sm mt-6">
                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-indigo-500 hover:text-indigo-800 ml-1">
                        {isLoginView ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;