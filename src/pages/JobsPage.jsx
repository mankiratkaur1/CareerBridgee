import React, { useState } from 'react';
import { LocationIcon, StarIcon } from '../components/icons';

const JobsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const jobCategories = [
        { id: 'all', name: 'All Jobs' },
        { id: 'technology', name: 'Technology' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'design', name: 'Design' },
        { id: 'sales', name: 'Sales' },
        { id: 'finance', name: 'Finance' },
        { id: 'healthcare', name: 'Healthcare' }
    ];

    const locations = [
        { id: 'all', name: 'All Locations' },
        { id: 'remote', name: 'Remote' },
        { id: 'new-york', name: 'New York' },
        { id: 'san-francisco', name: 'San Francisco' },
        { id: 'london', name: 'London' },
        { id: 'toronto', name: 'Toronto' }
    ];

    const jobs = [
        {
            id: 1,
            title: 'Senior React Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120k - $150k',
            category: 'technology',
            posted: '2 days ago',
            description: 'We are looking for an experienced React developer to join our team...',
            rating: 4.5
        },
        {
            id: 2,
            title: 'UX/UI Designer',
            company: 'Design Studio',
            location: 'Remote',
            type: 'Full-time',
            salary: '$90k - $110k',
            category: 'design',
            posted: '1 day ago',
            description: 'Join our creative team to design amazing user experiences...',
            rating: 4.2
        },
        {
            id: 3,
            title: 'Marketing Manager',
            company: 'Growth Co.',
            location: 'New York, NY',
            type: 'Full-time',
            salary: '$100k - $130k',
            category: 'marketing',
            posted: '3 days ago',
            description: 'Lead our marketing initiatives and drive growth...',
            rating: 4.0
        },
        {
            id: 4,
            title: 'Sales Representative',
            company: 'SalesForce',
            location: 'Toronto, ON',
            type: 'Full-time',
            salary: '$70k - $90k',
            category: 'sales',
            posted: '1 week ago',
            description: 'Build relationships and drive sales growth...',
            rating: 3.8
        },
        {
            id: 5,
            title: 'Financial Analyst',
            company: 'Finance Corp',
            location: 'London, UK',
            type: 'Full-time',
            salary: '$80k - $100k',
            category: 'finance',
            posted: '4 days ago',
            description: 'Analyze financial data and provide insights...',
            rating: 4.1
        },
        {
            id: 6,
            title: 'Nurse Practitioner',
            company: 'HealthCare Plus',
            location: 'Remote',
            type: 'Part-time',
            salary: '$60k - $80k',
            category: 'healthcare',
            posted: '2 weeks ago',
            description: 'Provide healthcare services remotely...',
            rating: 4.3
        }
    ];

    const filteredJobs = jobs.filter(job => {
        const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
        const matchesLocation = selectedLocation === 'all' || 
            (selectedLocation === 'remote' && job.location === 'Remote') ||
            (selectedLocation !== 'remote' && job.location.toLowerCase().includes(selectedLocation.replace('-', ' ')));
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesLocation && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Dream Job</h1>
                    <p className="text-gray-600">Discover thousands of job opportunities with all the information you need</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="container mx-auto px-6 py-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search jobs, companies..."
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {jobCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                            Search Jobs
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {filteredJobs.length} of {jobs.length} jobs
                    </p>
                </div>

                {/* Job Listings */}
                <div className="space-y-4">
                    {filteredJobs.map(job => (
                        <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                                    <p className="text-indigo-600 font-medium mb-2">{job.company}</p>
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <LocationIcon />
                                        <span>{job.location}</span>
                                        <span className="mx-2">•</span>
                                        <span>{job.type}</span>
                                        <span className="mx-2">•</span>
                                        <span>{job.posted}</span>
                                    </div>
                                    <p className="text-gray-700 mb-3">{job.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-600 font-semibold">{job.salary}</span>
                                        <div className="flex items-center">
                                            <StarIcon filled={true} />
                                            <span className="ml-1 text-gray-600">{job.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ml-4">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                        <p className="text-gray-400">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsPage; 