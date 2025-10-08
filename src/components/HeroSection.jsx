import React, { useState } from 'react';
import { UploadIcon } from './icons';

const HeroSection = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [uploadedResume, setUploadedResume] = useState(null);
    const [resumeName, setResumeName] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm, location);
        }
    };

    // Suggestions for the datalist autocomplete
    const jobSuggestions = [
        'Software Engineer',
        'Product Manager',
        'UX Designer',
        'Data Scientist',
        'AI Research Scientist',
        'Registered Nurse',
        'Investment Banking Analyst',
        'Content Marketing Specialist',
        'E-commerce Manager',
        'Robotics Engineer',
    ];

    const locationSuggestions = [
        'New York, NY',
        'San Francisco, CA',
        'Remote',
        'Austin, TX',
        'Seattle, WA',
        'Detroit, MI',
    ];

    const handleResumeUpload = () => {

        document.getElementById('resume-upload-input').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (validTypes.includes(file.type)) {
                setUploadedResume(file);
                setResumeName(file.name);
            } else {
                alert('Please upload a PDF, DOC, or DOCX file.');
            }
        }
    };

    const removeResume = () => {
        setUploadedResume(null);
        setResumeName('');
        // Reset the file input
        document.getElementById('resume-upload-input').value = '';
    };

    return (
        <section className="bg-indigo-50 py-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Find Your Next Career Move</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">The best place to discover job opportunities and get insights from real employees.</p>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center gap-2">
                    <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        className="flex-grow w-full md:w-auto p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={searchTerm}
                        list="job-suggestions"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <datalist id="job-suggestions">
                        {jobSuggestions.map(job => <option key={job} value={job} />)}
                    </datalist>
                    <input
                        type="text"
                        placeholder="City or remote"
                        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={location}
                        list="location-suggestions"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <datalist id="location-suggestions">
                        {locationSuggestions.map(loc => <option key={loc} value={loc} />)}
                    </datalist>
                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-indigo-600 text-white px-6 py-1 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
                        aria-label="Search for jobs"
                    >
                        Search Jobs
                    </button>
                </div>
                <div className="mt-6 text-sm text-gray-600">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                        <span className="font-semibold">Popular Jobs:</span>
                        {['Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist'].map(job => (
                            <button
                                key={job}
                                onClick={() => { setSearchTerm(job); onSearch(job, location); }}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition"
                            >
                                {job}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-2 flex-wrap">
                        <span className="font-semibold">Popular Locations:</span>
                        {['New York', 'San Francisco', 'Remote', 'Austin'].map(loc => (
                            <button
                                key={loc}
                                onClick={() => {
                                    setLocation(loc);
                                    onSearch(searchTerm, loc); // Pass both searchTerm and the new location
                                }}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition"
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-8">
                    {!uploadedResume ? (
                        <button onClick={handleResumeUpload} className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 font-semibold flex items-center mx-auto shadow-md">
                            <UploadIcon />
                            Upload Your Resume
                        </button>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-2 rounded-full mr-3">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-800">{resumeName}</p>
                                        <p className="text-sm text-green-600">Resume uploaded successfully!</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={removeResume}
                                    className="text-red-500 hover:text-red-700 transition duration-300 p-1"
                                    title="Remove resume"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    <input 
                        type="file" 
                        id="resume-upload-input" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        {!uploadedResume 
                            ? "We'll help you get noticed by top employers." 
                            : "Your resume is ready to be shared with employers."
                        }
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;