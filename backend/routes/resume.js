const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const auth = require('../middleware/auth'); // Assuming you have this middleware for user auth

// Make sure you have 'dotenv' installed and your .env file has a REAL Gemini API Key
// GEMINI_API_KEY=AIzaSy...
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyCkHeU7U7ktC4oYoZRT09Lq-mrxH2w5nTU');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/resumes'); // Adjusted path to be in project root
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `resume-${req.user.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// The main upload and processing route
router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded. Please select a PDF.' });
  }

  try {
    // 1. Extract text from the uploaded PDF
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    // Cleanup the temp file after parsing
    fs.unlinkSync(req.file.path);

    // 2. Call Gemini API with a comprehensive prompt
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = `
      Critically analyze the following resume text. Extract the information into a single, pure JSON object.
      - The output MUST be ONLY the JSON object, with no extra text or markdown formatting.
      - For the 'recommendations' part, suggest 3-4 suitable job titles with potential companies.

      JSON Schema to follow:
      {
        "name": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "skills": ["string"],
        "experienceSummary": "A 2-3 sentence summary of the candidate's professional experience.",
        "recommendations": [
          {
            "jobTitle": "string",
            "potentialCompanies": ["string"],
            "requiredSkills": ["string"],
            "averageSalary": "string (e.g., '$90,000 - $120,000')"
          }
        ]
      }

      Resume text to analyze:
      ---
      ${resumeText}
      ---
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();

    // 3. Clean and parse the AI response
    // The Gemini API might wrap the JSON in markdown ```json ... ```, so we clean it.
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    let processedData;
    try {
      processedData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini:", responseText);
      return res.status(500).json({ success: false, message: 'AI failed to return valid data. Please try again.' });
    }

    // 4. Send the complete data to the frontend
    res.json({
      success: true,
      data: processedData
    });

  } catch (err) {
    console.error('Error processing resume:', err.message);
    res.status(500).json({ success: false, message: 'Server error while processing resume.' });
  }
});

module.exports = router;