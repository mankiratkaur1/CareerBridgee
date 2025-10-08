const mongoose = require('mongoose');
const Job = require('./models/Job');
const { jobsData } = require('./seed');

// Connect to MongoDB and reset jobs
async function resetJobs() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/careerbridge');
    console.log('MongoDB Connected...');
    
    // Delete all existing jobs
    await Job.deleteMany({});
    console.log('All existing jobs deleted');
    
    // Insert new jobs from seed data
    const result = await Job.insertMany(jobsData);
    console.log(`Added ${result.length} jobs to the database`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Done! Database connection closed.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Run the reset function
resetJobs();