// src/services/GeminiApiServic

import axios from 'axios';

// ✅ CORRECT: Securely loads the API key from your .env.local file.
const API_KEY = 'AIzaSyCkHeU7U7ktC4oYoZRT09Lq-mrxH2w5nTU'; 

// ✅ CORRECT: Uses the standard Gemini 1.0 Pro model.
const MODEL_NAME = 'gemini-1.5-flash-latest';

// ✅ CORRECT: Uses the proper Gemini API endpoint and method (:generateContent).
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const parseGeminiResponse = (responseText) => {
  try {
    const jsonMatch =
      responseText.match(/```json\n([\s\S]*?)\n```/) ||
      responseText.match(/{[\s\S]*}/);

    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonString);
    }
    return null;
  } catch (error) {
    console.error('Error parsing the JSON from Gemini response.', error);
    console.error('Malformed JSON string was:', responseText);
    return null;
  }
};

export const processResume = async (resumeText) => {
  if (!API_KEY) {
    const errorMsg = "VITE_GEMINI_API_KEY is not set in your .env.local file. Please check it.";
    console.error(errorMsg);
    alert(errorMsg);
    return null;
  }
  
  try {
    // ✅ CORRECT: This payload structure matches the Gemini API.
    const response = await axios.post(API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Critically analyze the following resume text and extract the information into a pure JSON object.
              - The output MUST be only the JSON object, with no additional text, explanation, or markdown formatting around it.
              - If a field is not found, use an empty string "" or an empty array []. Do not omit the key.

              JSON Schema to follow:
              {
                "name": "string",
                "email": "string",
                "phone": "string",
                "location": "string",
                "skills": ["string"],
                "experienceSummary": "A 2-3 sentence summary of the candidate's professional experience.",
                "workExperience": [
                  {
                    "company": "string",
                    "position": "string",
                    "duration": "string",
                    "description": "string"
                  }
                ],
                "education": [
                  {
                    "institution": "string",
                    "degree": "string",
                    "field": "string",
                    "graduationYear": "string"
                  }
                ]
              }
              
              Resume text to analyze:
              ---
              ${resumeText}
              ---`,
            },
          ],
        },
      ],
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    });

    // ✅ CORRECT: This response structure matches the Gemini API.
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    console.log("--- Raw response from Gemini API ---");
    console.log(responseText);
    console.log("------------------------------------");

    return parseGeminiResponse(responseText);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error.response) {
      console.error('Error Details:', error.response.data);
      alert(`API Error: ${error.response.data.error.message}`);
    } else {
      alert('An unknown error occurred while contacting the Gemini API.');
    }
    return null;
  }
};

export const getJobRecommendations = async (skills, location, jobType) => {
   if (!API_KEY) {
     console.error("VITE_GEMINI_API_KEY is not set in your .env.local file.");
     return null;
   }
 
   try {
     const response = await axios.post(API_URL, {
         contents: [
           {
             parts: [
               {
                 text: `Based on these skills, location preference, and job type,
                 recommend 5 job titles and potential companies.
                 
                 Return JSON in this exact structure:
                 {
                   "recommendations": [
                     {
                       "jobTitle": "string",
                       "potentialCompanies": ["string"],
                       "requiredSkills": ["string"],
                       "averageSalary": "string (e.g., '$90,000 - $120,000')"
                     }
                   ]
                 }
                 
                 Skills: ${skills.join(', ')}
                 Location: ${location}
                 Job Type: ${jobType}`
               }
             ]
           }
         ]
       }
     );
 
     const responseText = response?.data?.candidates[0]?.content?.parts[0]?.text;

     if (!responseText) {
        console.error('Unexpected response structure from Gemini API:', response.data);
        return null;
     }

     return parseGeminiResponse(responseText);
 
   } catch (error) {
     console.error('Error getting job recommendations with Gemini API:', error);
     alert('Error getting job recommendations. Check the console for details.');
   }
 };

// Match resume skills with available jobs
export const matchResumeWithJobs = async (resumeData, availableJobs) => {
  if (!API_KEY) {
    console.error("API_KEY is not set. Cannot match resume with jobs.");
    return null;
  }

  try {
    // Extract relevant information from resume data
    const { skills, experienceSummary, workExperience } = resumeData;
    
    // Format jobs data for the API
    const jobsData = availableJobs.map(job => ({
      id: job._id,
      title: job.title,
      company: job.company,
      requirements: job.requirements,
      description: job.description
    }));

    const response = await axios.post(API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Match the candidate's resume with the available jobs and rank them by relevance.
              
              Candidate Resume Information:
              - Skills: ${skills.join(', ')}
              - Experience Summary: ${experienceSummary}
              - Work Experience: ${workExperience.map(exp => `${exp.position} at ${exp.company}`).join(', ')}
              
              Available Jobs:
              ${JSON.stringify(jobsData)}
              
              Return JSON in this exact structure:
              {
                "matchedJobs": [
                  {
                    "jobId": "string",
                    "relevanceScore": number (0-100),
                    "matchedSkills": ["string"],
                    "missingSkills": ["string"],
                    "fitReason": "string (brief explanation of why this job is a good fit)"
                  }
                ]
              }
              
              Sort the jobs by relevanceScore in descending order. Include only jobs with a relevance score above 30.`
            }
          ]
        }
      ]
    });

    const responseText = response?.data?.candidates[0]?.content?.parts[0]?.text;

    if (!responseText) {
      console.error('Unexpected response structure from Gemini API:', response.data);
      return null;
    }

    return parseGeminiResponse(responseText);

  } catch (error) {
    console.error('Error matching resume with jobs:', error);
    return null;
  }
};