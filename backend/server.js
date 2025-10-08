const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const resumeRoutes = require('./routes/resume');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory for resumes
const uploadsDir = path.join(__dirname, 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/careerbridge')
.then(async () => {
  console.log('MongoDB connected');
  
  // Check if jobs collection is empty
  const Job = require('./models/Job');
  const jobCount = await Job.countDocuments();
  
  // If no jobs exist, seed the database
  if (jobCount === 0) {
    console.log('No jobs found in database. Seeding initial job data...');
    try {
      // Import job data from seed file
      const seedData = require('./seed').jobsData;
      await Job.insertMany(seedData);
      console.log(`Added ${seedData.length} jobs to the database`);
    } catch (err) {
      console.error('Error seeding database:', err.message);
    }
  } else {
    console.log(`Database has ${jobCount} jobs`);
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/resume', resumeRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('CareerBridge API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});