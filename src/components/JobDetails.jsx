import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LocationIcon } from './icons';
import { JobContext } from '../context/JobContext';
import { enhanceJobDetails } from '../services/googleApiService';
import fallbackJobs from '../data/fallbackJobs';

const JobDetails = ({ jobId, onClose, onApply }) => {
  const { jobs, loading: contextLoading, error: contextError } = useContext(JobContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // First try to find the job in the context
        if (jobs && jobs.length > 0) {
          const foundJob = jobs.find(j => j._id == jobId);
          if (foundJob) {
            // Enhance job with Google API data
            const enhancedJob = await enhanceJobDetails(foundJob);
            setJob(enhancedJob);
            setLoading(false);
            return;
          }
        }
        
        // If not found in context, fetch from API
        const res = await axios.get(`http://localhost:5001/api/jobs/${jobId}`);
        // Enhance job with Google API data
        const enhancedJob = await enhanceJobDetails(res.data);
        setJob(enhancedJob);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job details:', err);
        // Use fallback job if API fails
        if (jobId && jobId.startsWith('fb-')) {
          // It's a fallback job ID
          const fallbackJob = fallbackJobs.find(j => j.id === jobId);
          if (fallbackJob) {
            setJob(fallbackJob);
          } else {
            setError('Failed to load job details. Please try again later.');
          }
        } else {
          // Try to find a fallback job as replacement
          setJob(fallbackJobs[0]);
          setError('Failed to load job details. Showing a sample job instead.');
        }
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId, jobs]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
          <div className="text-red-500 text-center">{error}</div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to mock data if job is null
  const jobData = job || {
    title: 'Senior React Developer',
    company: 'Innovate Inc.',
    location: 'New York, NY',
    jobType: 'Full-time',
    description: 'Join our team to build next-gen web applications with React and Node.js.',
    requirements: 'At least 3 years of experience with React, Node.js, and modern JavaScript.',
    salary: '$120,000 - $150,000'
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{jobData.title}</h2>
            <p className="text-indigo-600 font-semibold">{jobData.company}</p>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full ${jobData.jobType === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {jobData.jobType || 'Full-time'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 mt-4">
          <LocationIcon />
          <span>{jobData.location}</span>
        </div>
        
        {jobData.salary && (
          <div className="mt-4">
            <span className="font-semibold">Salary:</span> {jobData.salary}
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Job Description</h3>
          <p className="text-gray-600 mt-2">{jobData.description}</p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Requirements</h3>
          <p className="text-gray-600 mt-2">{jobData.requirements}</p>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
          <button
            onClick={() => onApply(jobData._id)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;