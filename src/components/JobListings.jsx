import React, { useState, useEffect, useContext } from 'react';
import JobCard from './JobCard';
import { JobContext } from '../context/JobContext';

// Hard-coded job data for fallback
const hardcodedJobs = [
    {
        _id: '1',
        title: 'Senior React Developer',
        company: 'Tech Solutions Inc.',
        location: 'San Francisco, CA',
        description: 'Join our team to build next-gen web applications with React.',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        postedDate: new Date('2023-10-26T10:00:00Z'),
    },
    {
        _id: '2',
        title: 'Node.js Backend Engineer',
        company: 'Cloud Innovations',
        location: 'New York, NY (Remote)',
        description: 'We are looking for a skilled Node.js developer to manage our server-side logic.',
        salary: '$110,000 - $140,000',
        type: 'Full-time',
    },
];

const JobListings = ({ onViewDetails }) => {
    const { jobs, loading, error, getJobs } = useContext(JobContext);

    useEffect(() => {
        getJobs();
    }, [getJobs]);

    // Use fetched jobs, but fall back to hardcoded jobs if the fetched list is empty or null
    const displayJobs = (jobs && jobs.length > 0) ? jobs : hardcodedJobs;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Job Openings</h2>
                
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 mb-4">{error}</div>
                ) : (
                    <>
                        {displayJobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                {displayJobs.map(job => (
                                    <JobCard 
                                        key={job._id} 
                                        job={job} 
                                        onViewDetails={() => onViewDetails(job._id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">No jobs available at the moment.</div>
                        )}
                    </>
                )}
                
                <div className="text-center mt-12">
                    <a href="#" className="text-indigo-600 font-semibold hover:underline">View All Jobs &rarr;</a>
                </div>
            </div>
        </section>
    );
};


export default JobListings;