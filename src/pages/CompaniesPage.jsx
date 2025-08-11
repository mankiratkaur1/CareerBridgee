import React, { useState } from 'react';
import { StarIcon, LocationIcon } from '../components/icons';

const CompaniesPage = () => {
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const industries = [
        { id: 'all', name: 'All Industries' },
        { id: 'technology', name: 'Technology' },
        { id: 'healthcare', name: 'Healthcare' },
        { id: 'finance', name: 'Finance' },
        { id: 'retail', name: 'Retail' },
        { id: 'manufacturing', name: 'Manufacturing' },
        { id: 'education', name: 'Education' }
    ];

    const locations = [
        { id: 'all', name: 'All Locations' },
        { id: 'san-francisco', name: 'San Francisco' },
        { id: 'new-york', name: 'New York' },
        { id: 'seattle', name: 'Seattle' },
        { id: 'austin', name: 'Austin' },
        { id: 'remote', name: 'Remote' }
    ];

    const companies = [
        {
            id: 1,
            name: 'TechCorp Inc.',
            industry: 'technology',
            location: 'San Francisco, CA',
            rating: 4.5,
            reviewCount: 1247,
            employeeCount: '1000-5000',
            founded: 2010,
            description: 'Leading technology company specializing in AI and machine learning solutions.',
            openJobs: 23,
            logo: '🔵'
        },
        {
            id: 2,
            name: 'HealthCare Plus',
            industry: 'healthcare',
            location: 'New York, NY',
            rating: 4.2,
            reviewCount: 892,
            employeeCount: '5000-10000',
            founded: 2005,
            description: 'Innovative healthcare provider focused on patient-centered care and digital health solutions.',
            openJobs: 15,
            logo: '🏥'
        },
        {
            id: 3,
            name: 'Finance Corp',
            industry: 'finance',
            location: 'New York, NY',
            rating: 3.9,
            reviewCount: 567,
            employeeCount: '1000-5000',
            founded: 1998,
            description: 'Global financial services company providing investment and banking solutions.',
            openJobs: 8,
            logo: '💰'
        },
        {
            id: 4,
            name: 'Design Studio',
            industry: 'technology',
            location: 'Remote',
            rating: 4.7,
            reviewCount: 234,
            employeeCount: '100-500',
            founded: 2015,
            description: 'Creative design agency helping brands create meaningful digital experiences.',
            openJobs: 12,
            logo: '🎨'
        },
        {
            id: 5,
            name: 'Growth Co.',
            industry: 'technology',
            location: 'Seattle, WA',
            rating: 4.1,
            reviewCount: 445,
            employeeCount: '500-1000',
            founded: 2012,
            description: 'SaaS company focused on business growth and marketing automation tools.',
            openJobs: 18,
            logo: '📈'
        },
        {
            id: 6,
            name: 'EduTech Solutions',
            industry: 'education',
            location: 'Austin, TX',
            rating: 4.3,
            reviewCount: 678,
            employeeCount: '500-1000',
            founded: 2018,
            description: 'Educational technology platform revolutionizing online learning experiences.',
            openJobs: 9,
            logo: '📚'
        },
        {
            id: 7,
            name: 'Retail Innovations',
            industry: 'retail',
            location: 'San Francisco, CA',
            rating: 3.8,
            reviewCount: 334,
            employeeCount: '1000-5000',
            founded: 2008,
            description: 'Modern retail company combining e-commerce with innovative in-store experiences.',
            openJobs: 14,
            logo: '🛍️'
        },
        {
            id: 8,
            name: 'Manufacturing Pro',
            industry: 'manufacturing',
            location: 'Detroit, MI',
            rating: 4.0,
            reviewCount: 456,
            employeeCount: '5000-10000',
            founded: 1995,
            description: 'Advanced manufacturing company specializing in automotive and industrial solutions.',
            openJobs: 6,
            logo: '🏭'
        }
    ];

    const filteredCompanies = companies.filter(company => {
        const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
        const matchesLocation = selectedLocation === 'all' || 
            (selectedLocation === 'remote' && company.location === 'Remote') ||
            (selectedLocation !== 'remote' && company.location.toLowerCase().includes(selectedLocation.replace('-', ' ')));
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             company.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesIndustry && matchesLocation && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Top Companies</h1>
                    <p className="text-gray-600">Discover amazing companies and find your next career opportunity</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="container mx-auto px-6 py-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                        >
                            {industries.map(industry => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.name}
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
                            Search Companies
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {filteredCompanies.length} of {companies.length} companies
                    </p>
                </div>

                {/* Company Listings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.map(company => (
                        <div key={company.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="text-3xl mr-3">{company.logo}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <LocationIcon />
                                            <span>{company.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center">
                                        <StarIcon filled={true} />
                                        <span className="ml-1 text-sm font-medium">{company.rating}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{company.reviewCount} reviews</p>
                                </div>
                            </div>
                            
                            <p className="text-gray-700 text-sm mb-4">{company.description}</p>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Employees:</span>
                                    <span className="font-medium">{company.employeeCount}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Founded:</span>
                                    <span className="font-medium">{company.founded}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Open Jobs:</span>
                                    <span className="font-medium text-green-600">{company.openJobs}</span>
                                </div>
                            </div>
                            
                            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                                View Jobs
                            </button>
                        </div>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No companies found matching your criteria.</p>
                        <p className="text-gray-400">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompaniesPage; 