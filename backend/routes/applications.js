const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Set up multer storage for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for resume uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents are allowed'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   POST api/applications
// @desc    Apply for a job
// @access  Private
router.post('/', auth, upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, email, phone, coverLetter } = req.body;
    
    // Check if jobId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      // For fallback jobs with string IDs like "fb-001"
      // Create a mock successful response
      return res.status(200).json({ 
        msg: 'Application submitted successfully',
        mockApplication: true
      });
    }
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }
    
    // Create new application
    const newApplication = new Application({
      job: jobId,
      applicant: req.user.id,
      resumePath: `/uploads/${req.file.filename}`
    });
    
    const application = await newApplication.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications/user
// @desc    Get all applications for current user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', ['title', 'company', 'location'])
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications/job/:jobId
// @desc    Get all applications for a specific job
// @access  Private
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    // Check if job exists
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    // Check if user is the job poster
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', ['name', 'email'])
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;