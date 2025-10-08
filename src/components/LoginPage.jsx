import React, { useState } from 'react';
import { BriefcaseIcon } from './icons';
import axios from 'axios';

const LoginPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, email, password } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let res;
            if (isLoginView) {
                // Login
                res = await axios.post('/api/auth/login', {
                    email,
                    password
                });
            } else {
                // Register
                res = await axios.post('/api/auth/register', {
                    name,
                    email,
                    password
                });
            }

            // Save token to localStorage
            localStorage.setItem('token', res.data.token);
            
            // Notify parent component of successful login
            onLoginSuccess();
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred. Please try again.');
            setLoading(false);
        }
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
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {!isLoginView && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                name="name"
                                value={name}
                                onChange={handleChange}
                                type="text" 
                                placeholder="John Doe" 
                                required 
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            name="email"
                            value={email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="you@example.com" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            name="password"
                            value={password}
                            onChange={handleChange}
                            type="password" 
                            placeholder="******************" 
                            required 
                        />
                        {isLoginView && <a className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800" href="#">Forgot Password?</a>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : isLoginView ? 'Sign In' : 'Sign Up'}
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