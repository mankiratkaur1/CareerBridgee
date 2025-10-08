import axios from 'axios';

const API_KEY = 'AIzaSyCkHeU7U7ktC4oYoZRT09Lq-mrxH2w5nTU';
const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const JOBS_API_BASE_URL = 'https://jobs.googleapis.com/v4/projects';

/**
 * Get company details using Google Places API
 * @param {string} companyName - Name of the company to search for
 * @returns {Promise} - Promise with company details
 */
export const getCompanyDetails = async (companyName) => {
  try {
    // First search for the company
    const searchResponse = await axios.get(
      `${PLACES_API_BASE_URL}/textsearch/json?query=${encodeURIComponent(companyName)}&type=establishment&key=${API_KEY}`
    );
    
    if (searchResponse.data.results && searchResponse.data.results.length > 0) {
      const placeId = searchResponse.data.results[0].place_id;
      
      // Then get details using the place_id
      const detailsResponse = await axios.get(
        `${PLACES_API_BASE_URL}/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,photos,reviews,opening_hours&key=${API_KEY}`
      );
      
      return detailsResponse.data.result;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching company details:', error);
    return null;
  }
};

/**
 * Enhance job listing with additional details from Google
 * @param {Object} job - Basic job information
 * @returns {Promise} - Promise with enhanced job details
 */
export const enhanceJobDetails = async (job) => {
  try {
    if (!job || !job.company) return job;
    
    const companyDetails = await getCompanyDetails(job.company);
    
    if (companyDetails) {
      return {
        ...job,
        companyDetails: {
          address: companyDetails.formatted_address || '',
          phone: companyDetails.formatted_phone_number || '',
          website: companyDetails.website || '',
          rating: companyDetails.rating || 0,
          photos: companyDetails.photos || [],
          reviews: companyDetails.reviews || [],
          openingHours: companyDetails.opening_hours || {}
        }
      };
    }
    
    return job;
  } catch (error) {
    console.error('Error enhancing job details:', error);
    return job;
  }
};

/**
 * Search for similar jobs based on job title and location
 * @param {string} jobTitle - Job title to search for
 * @param {string} location - Location to search in
 * @returns {Promise} - Promise with similar jobs
 */
export const findSimilarJobs = async (jobTitle, location) => {
  try {
    // This is a placeholder for actual Google Jobs API integration
    // Google Jobs Search API requires special approval and setup
    // For now, we'll return a mock response
    
    // In a real implementation, you would use the Jobs API like:
    // const response = await axios.get(
    //   `${JOBS_API_BASE_URL}/YOUR_PROJECT_ID/jobs:search?query=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}&key=${API_KEY}`
    // );
    
    // Mock response for similar jobs
    return [
      {
        title: `Senior ${jobTitle}`,
        company: 'Tech Innovations Inc.',
        location: location,
        salary: '$110k - $140k',
        description: `Looking for an experienced ${jobTitle} to join our growing team.`
      },
      {
        title: `${jobTitle} Team Lead`,
        company: 'Digital Solutions',
        location: location,
        salary: '$130k - $160k',
        description: `Lead our ${jobTitle} team and drive innovation.`
      },
      {
        title: `${jobTitle} Specialist`,
        company: 'Global Tech',
        location: location,
        salary: '$100k - $120k',
        description: `Join our specialized ${jobTitle} team working on cutting-edge projects.`
      }
    ];
  } catch (error) {
    console.error('Error finding similar jobs:', error);
    return [];
  }
};

export default {
  getCompanyDetails,
  enhanceJobDetails,
  findSimilarJobs
};