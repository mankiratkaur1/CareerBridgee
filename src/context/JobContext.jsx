import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import fallbackJobs from '../data/fallbackJobs';

// Create context
export const JobContext = createContext();

// Initial state
const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: null
};

// Reducer
const jobReducer = (state, action) => {
  switch (action.type) {
    case 'GET_JOBS':
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case 'GET_JOB':
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case 'JOB_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_JOB':
      return {
        ...state,
        job: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

// Provider component
export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get all jobs
  const getJobs = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get('http://localhost:5001/api/jobs');
      
      if (res.data && res.data.length > 0) {
        dispatch({
          type: 'GET_JOBS',
          payload: res.data
        });
      } else {
        // Use fallback data if API returns empty
        dispatch({
          type: 'GET_JOBS',
          payload: fallbackJobs
        });
      }
    } catch (err) {
      // Use fallback data on error
      dispatch({
        type: 'GET_JOBS',
        payload: fallbackJobs
      });
      
      dispatch({
        type: 'JOB_ERROR',
        payload: 'Failed to load jobs. Showing fallback jobs instead.'
      });
    }
  }, [dispatch]);

  // Get job by ID
  const getJobById = useCallback(async (id) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get(`http://localhost:5001/api/jobs/${id}`);
      
      dispatch({
        type: 'GET_JOB',
        payload: res.data
      });
    } catch (err) {
      // Use mock data for the specific job
      const mockJob = {
        _id: id,
        title: 'Senior React Developer',
        company: 'Innovate Inc.',
        location: 'New York, NY',
        jobType: 'Full-time',
        description: 'Join our team to build next-gen web applications with React and Node.js.',
        requirements: 'At least 3 years of experience with React, Node.js, and modern JavaScript.',
        salary: '$120,000 - $150,000'
      };
      
      dispatch({
        type: 'GET_JOB',
        payload: mockJob
      });
      
      dispatch({
        type: 'JOB_ERROR',
        payload: 'Failed to load job details. Using sample data instead.'
      });
    }
  }, [dispatch]);

  // Clear current job
  const clearJob = useCallback(() => dispatch({ type: 'CLEAR_JOB' }), [dispatch]);

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        job: state.job,
        loading: state.loading,
        error: state.error,
        getJobs,
        getJobById,
        clearJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;