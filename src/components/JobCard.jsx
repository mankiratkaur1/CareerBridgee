import React from 'react';
import { LocationIcon } from './icons';

const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <p className="text-indigo-600 font-semibold">{job.company}</p>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {job.type}
            </span>
        </div>
        <div className="flex items-center text-gray-500 mt-4">
            <LocationIcon />
            <span>{job.location}</span>
        </div>
        <p className="text-gray-600 mt-4">{job.description}</p>
        <div className="mt-6">
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Apply Now</button>
        </div>
    </div>
);

export default JobCard;