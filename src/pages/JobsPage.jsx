import React, { useState, useEffect, useContext } from 'react';
import { LocationIcon, StarIcon } from '../components/icons';
import JobDetails from '../components/JobDetails';
import ApplicationForm from '../components/ApplicationForm';
import CreateJobForm from '../components/CreateJobForm';
import { JobContext } from '../context/JobContext';
import { AuthContext } from '../context/AuthContext';
import fallbackJobs from '../data/fallbackJobs';

const JobsPage = ({ companyFilter, initialFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    // Initialize state from props
    const [selectedLocation, setSelectedLocation] = useState(initialFilters?.location || 'all'); // This is for the sidebar filter
    const [activeSearchTerm, setActiveSearchTerm] = useState(companyFilter || initialFilters?.term || '');
    const [searchTerm, setSearchTerm] = useState(companyFilter || initialFilters?.term || '');
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    
    const { jobs, loading, error, getJobs } = useContext(JobContext);
    const { isAuthenticated } = useContext(AuthContext);
    
    useEffect(() => {
        // Set search term from either company filter or hero search
        // This ensures that if the user navigates back and forth, the filters are reapplied
        setSearchTerm(companyFilter || initialFilters?.term || '');
        setActiveSearchTerm(companyFilter || initialFilters?.term || '');
        setSelectedLocation(initialFilters?.location || 'all');
    }, [companyFilter, initialFilters]);

    useEffect(() => {
        getJobs();
    }, [getJobs]);

    const handleViewDetails = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleCloseDetails = () => {
        setSelectedJobId(null);
    };

    const handleApply = (jobId) => {
        setShowApplicationForm(true);
    };

    const handleCloseApplication = () => {
        setShowApplicationForm(false);
        setSelectedJobId(null);
    };

    const handleApplicationSuccess = () => {
        setTimeout(() => {
            setShowApplicationForm(false);
            setSelectedJobId(null);
        }, 2000);
    };

    const handleCreateJob = () => {
        setShowCreateForm(true);
    };

    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
    };

    const handleJobCreated = (newJob) => {
        setJobs([newJob, ...jobs]);
        setShowCreateForm(false);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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

    // Use fetched jobs, but fall back to hardcoded jobs if the fetched list is empty or null
    const displayJobs = (jobs && jobs.length > 0) ? jobs : fallbackJobs;

    const filteredJobs = displayJobs ? displayJobs.filter(job => {
        if (!job) return false;
        
        const matchesCategory = selectedCategory === 'all' || 
            (job.category && job.category.toLowerCase() === selectedCategory) ||
            (job.jobType && job.jobType.toLowerCase().replace('-', '') === selectedCategory.replace('-', ''));
            
        // Unified Location Filtering
        // It uses the sidebar filter unless a more specific one came from the initial search.
        const locationFilterTerm = (initialFilters?.location || selectedLocation || 'all').replace('-', ' ');
        const matchesLocation = locationFilterTerm === 'all' || 
            (job.location && job.location.toLowerCase().includes(locationFilterTerm.toLowerCase()));

        // Search term filtering (for title, company, description)
        const searchTermLower = activeSearchTerm.toLowerCase();
        const matchesSearchTerm = activeSearchTerm === '' || 
            (job.title && job.title.toLowerCase().includes(searchTermLower)) ||
            (job.company && job.company.toLowerCase().includes(searchTermLower)) ||
            (job.description && job.description.toLowerCase().includes(searchTermLower)) ||
            // Also check if the search term matches the location
            (job.location && job.location.toLowerCase().includes(searchTermLower));

        // Combine all filters
        return matchesCategory && matchesLocation && matchesSearchTerm;
    }) : [];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Find Your Dream Job</h1>
                    {isAuthenticated && (
                        <button
                            onClick={handleCreateJob}
                            className="mt-4 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Post a New Job
                        </button>
                    )}
                </div>
                
                {error && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                        <p>{error}</p>
                    </div>
                )}
                
                {/* Search Bar */}
                <div className="mb-8">
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Search jobs..."
      className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={searchTerm}
      onKeyDown={handleKeyDown}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button 
      onClick={handleSearch}
      className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
    >
      Search
    </button>
  </div>
</div>
                {loading && jobs.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    {jobCategories.map(category => (
                                        <li key={category.id}>
                                            <button
                                                className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === category.id ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                                                onClick={() => setSelectedCategory(category.id)}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                
                                <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Locations</h3>
                                <ul className="space-y-2">
                                    {locations.map(location => (
                                        <li key={location.id}>
                                            <button
                                                className={`w-full text-left px-3 py-2 rounded-md ${selectedLocation === location.id ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                                                onClick={() => setSelectedLocation(location.id)}
                                            >
                                                {location.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        {/* Job Listings */}
                        <div className="lg:w-3/4">
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                                </h2>
                                <div className="text-gray-500">
                                    Sort by: <span className="text-indigo-600 font-medium">Newest</span>
                                </div>
                            </div>
                            
                            {filteredJobs.length === 0 ? (
                                <div className="bg-gray-50 p-8 rounded-lg text-center">
                                    <h3 className="text-xl text-gray-600">No jobs found matching your criteria</h3>
                                    <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {filteredJobs.map(job => (
                                        <div key={job._id || job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                                                    <p className="text-indigo-600 font-semibold">{job.company}</p>
                                                    <div className="flex items-center text-gray-500 mt-2">
                                                        <LocationIcon />
                                                        <span className="ml-1">{job.location}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${(job.jobType || job.type) === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {job.jobType || job.type || 'Full-time'}
                                                    </span>
                                                    {job.rating && (
                                                        <div className="mt-2 flex items-center justify-end">
                                                            <StarIcon />
                                                            <span className="ml-1 text-gray-700">{job.rating}</span>
                                                        </div>
                                                    )}
                                                    {job.posted && (
                                                        <div className="mt-1 text-sm text-gray-500">Posted {job.posted}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mt-4">{job.description}</p>
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-gray-700 font-medium">{job.salary || 'Salary not specified'}</span>
                                                <button 
                                                    onClick={() => handleViewDetails(job._id || job.id)}
                                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {selectedJobId && !showApplicationForm && (
                    <JobDetails 
                        jobId={selectedJobId} 
                        onClose={handleCloseDetails}
                        onApply={handleApply}
                    />
                )}

                {showApplicationForm && (
                    <ApplicationForm 
                        jobId={selectedJobId}
                        onClose={handleCloseApplication}
                        onSuccess={handleApplicationSuccess}
                    />
                )}

                {showCreateForm && (
                    <CreateJobForm 
                        onClose={handleCloseCreateForm}
                        onSuccess={handleJobCreated}
                    />
                )}
            </div>
        </section>
    );
};

export default JobsPage;