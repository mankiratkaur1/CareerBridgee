import React, { useState, useContext, useEffect } from 'react';
import ResumeUpload from '../components/ResumeUpload';
import { JobContext } from '../context/JobContext';
import { matchResumeWithJobs } from '../services/geminiApiService';

const ResumePage = () => {
  const [processedData, setProcessedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);
  
  // Access jobs from JobContext
  const { jobs, loading: jobsLoading, getJobs } = useContext(JobContext);
  
  // Fetch jobs when component mounts
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  // This function is the callback that receives the data from the backend
  const handleResumeProcessed = async (data) => {
    setProcessedData(data);
    setIsLoading(false); // Make sure loading stops once data is received
    
    // If we have jobs and resume data, match them
    if (jobs && jobs.length > 0 && data) {
      setMatchLoading(true);
      try {
        const matchResults = await matchResumeWithJobs(data, jobs);
        if (matchResults && matchResults.matchedJobs) {
          setMatchedJobs(matchResults.matchedJobs);
        }
      } catch (error) {
        console.error('Error matching resume with jobs:', error);
      } finally {
        setMatchLoading(false);
      }
    }
  };

  const handleUploadStart = () => {
    setIsLoading(true);
    setProcessedData(null); // Clear previous results
    setMatchedJobs([]); // Clear previous job matches
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Resume Analysis & Job Matching
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          {/* This component now handles its own loading state for the upload process */}
          <ResumeUpload onResumeProcessed={handleResumeProcessed} />
        </div>

        {/* Analysis + Recommendations Section */}
        <div>
          {processedData ? (
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Analysis Complete</h2>

              {/* Skills */}
              {processedData.skills && processedData.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Skills Identified</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Summary */}
              {processedData.experienceSummary && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Experience Summary</h3>
                  <p className="text-gray-700">{processedData.experienceSummary}</p>
                </div>
              )}

              {/* Job Recommendations from AI */}
              {processedData.recommendations && processedData.recommendations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">AI Job Recommendations</h3>
                  <div className="space-y-3">
                    {processedData.recommendations.map((job, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 p-3 rounded hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-medium text-gray-800">{job.jobTitle}</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Companies:</strong> {job.potentialCompanies?.join(', ') || "N/A"}
                        </p>
                         <p className="text-sm text-gray-500">
                          <strong>Salary Estimate:</strong> {job.averageSalary || "Not available"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Matched Jobs from our Database */}
              {matchedJobs && matchedJobs.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Matched Jobs in Our Database</h3>
                  <p className="text-sm text-gray-600 mb-3">These jobs match your skills and experience:</p>
                  <div className="space-y-4">
                    {matchedJobs.map((match, index) => {
                      // Find the full job details from the jobs array
                      const jobDetails = jobs.find(job => job._id === match.jobId);
                      if (!jobDetails) return null;
                      
                      return (
                        <div key={index} className="border border-gray-200 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800">{jobDetails.title}</h4>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                              {match.relevanceScore}% Match
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-700 mt-1">
                            <strong>{jobDetails.company}</strong> • {jobDetails.location}
                          </p>
                          
                          {match.matchedSkills && match.matchedSkills.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">Matched Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {match.matchedSkills.map((skill, i) => (
                                  <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {match.missingSkills && match.missingSkills.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">Skills to Develop:</p>
                              <div className="flex flex-wrap gap-1">
                                {match.missingSkills.map((skill, i) => (
                                  <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {match.fitReason && (
                            <p className="text-sm text-gray-600 mt-2 italic">
                              "{match.fitReason}"
                            </p>
                          )}
                          
                          <div className="mt-3 pt-2 border-t border-gray-100">
                            <a href={`/jobs/${jobDetails._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Job Details →
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : matchLoading ? (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Matching your resume with available jobs...</p>
                  <div className="mt-2 w-full h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="animate-pulse bg-blue-600 h-1 w-full"></div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">
                Your resume analysis and job recommendations will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;