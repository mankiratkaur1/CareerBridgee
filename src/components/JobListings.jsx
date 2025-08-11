import React from 'react';
import JobCard from './JobCard';

// Mock data would typically be fetched from an API, but we'll define it here for now.

const mockJobs = [
    { id: 1, title: 'Senior React Developer', company: 'Innovate Inc.', location: 'New York, NY', type: 'Full-time', description: 'Join our team to build next-gen web applications with React and Node.js.' },
    { id: 2, title: 'UX/UI Designer', company: 'Creative Solutions', location: 'San Francisco, CA', type: 'Contract', description: 'Design beautiful and intuitive user interfaces for our mobile and web products.' },
    { id: 3, title: 'Data Scientist', company: 'DataDriven Co.', location: 'Austin, TX', type: 'Full-time', description: 'Analyze large datasets to extract meaningful insights and drive business decisions.' },
    { id: 4, title: 'Product Manager', company: 'FutureTech', location: 'Remote', type: 'Full-time', description: 'Lead the product lifecycle from conception to launch for our AI platform.' },
];

const JobListings = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Job Openings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {mockJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
            <div className="text-center mt-12">
                <a href="#" className="text-indigo-600 font-semibold hover:underline">View All Jobs &rarr;</a>
            </div>
        </div>
    </section>
);

export default JobListings;