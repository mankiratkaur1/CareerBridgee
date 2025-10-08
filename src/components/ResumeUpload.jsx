// src/components/ResumeUpload.jsx

import React, { useState } from 'react';
// ✅ Import the service that calls the Gemini API
import { processResume } from '../services/geminiApiService'; 
// ✅ Import the PDF parsing library
import * as pdfjsLib from 'pdfjs-dist';

// ✅ Required setup for the PDF library
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

const ResumeUpload = ({ onResumeProcessed }) => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState(''); // ✅ State to hold extracted text
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null);
        setLoading(true); // Show loading while parsing PDF
        
        // ✅ Extract text from PDF
        try {
          const reader = new FileReader();
          reader.onload = async (event) => {
            const pdfData = new Uint8Array(event.target.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            let textContent = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const text = await page.getTextContent();
              textContent += text.items.map((s) => s.str).join(' ');
            }
            setResumeText(textContent); // Store the extracted text
          };
          reader.readAsArrayBuffer(selectedFile);
        } catch (err) {
          console.error('Error extracting text from PDF:', err);
          setError('Could not read the PDF file. Please try another one.');
          setFile(null);
          setResumeText('');
        } finally {
          setLoading(false);
        }

      } else {
        setFile(null);
        setResumeText('');
        setError('Please upload a valid PDF file.');
      }
    }
  };

  const handleProcessResume = async () => {
    if (!resumeText) {
      setError('Resume text could not be extracted. Please re-upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ Call the Gemini API service directly from the frontend
      const processedData = await processResume(resumeText);
      
      if (processedData) {
        if (onResumeProcessed) {
          // Send the structured data to the parent component (ResumePage)
          onResumeProcessed(processedData); 
        }
      } else {
        setError('Failed to process resume with AI. The format might be invalid.');
      }
    } catch (err) {
      console.error('Error processing resume:', err);
      setError('A server error occurred while processing the resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <p className="text-gray-600 mb-4">
        Upload your resume to get personalized job recommendations and analysis powered by AI.
      </p>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {file && (
        <div className="mb-4">
          <p className="text-sm text-gray-700">File selected: <span className="font-medium">{file.name}</span></p>
          {resumeText && <p className="text-sm text-green-600">✅ PDF text extracted successfully.</p>}
        </div>
      )}

      <button
        onClick={handleProcessResume}
        disabled={loading || !resumeText}
        className={`w-full py-2 px-4 rounded font-medium transition-colors ${
          loading || !resumeText
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Analyze & Find Jobs'}
      </button>
    </div>
  );
};

export default ResumeUpload;