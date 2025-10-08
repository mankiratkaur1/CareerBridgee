const mongoose = require('mongoose');
const Job = require('./models/Job');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Sample jobs data to seed the database
const jobsData = [
  {
    title: "AI Research Scientist",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    description: "Join our AI team to work on cutting-edge machine learning models and solutions that redefine industries.",
    requirements: "PhD or MS in Computer Science, specializing in AI/ML. Strong experience with Python, TensorFlow, or PyTorch.",
    salary: "$140,000 - $180,000"
  },
  {
    title: "Registered Nurse (Telehealth)",
    company: "HealthCare Plus",
    location: "New York, NY",
    jobType: "Full-time",
    description: "Provide patient-centered care through our innovative digital health platform. Must be a licensed RN.",
    requirements: "Valid RN license. 2+ years of clinical experience. Experience with telehealth platforms is a plus.",
    salary: "$90,000 - $110,000"
  },
  {
    title: "Investment Banking Analyst",
    company: "Finance Corp",
    location: "New York, NY",
    jobType: "Full-time",
    description: "Analyze financial data, build models, and support senior bankers in executing M&A and capital raising transactions.",
    requirements: "Bachelor's degree in Finance or a related field. Strong analytical and quantitative skills.",
    salary: "$100,000 - $130,000"
  },
  {
    title: "Senior Product Designer",
    company: "Design Studio",
    location: "Remote",
    jobType: "Full-time",
    description: "Lead the design of meaningful digital experiences for our clients. A strong portfolio is required.",
    requirements: "5+ years of experience in UX/UI design. Proficiency in Figma, Sketch, and Adobe Creative Suite.",
    salary: "$110,000 - $140,000"
  },
  {
    title: "Content Marketing Specialist",
    company: "Growth Co.",
    location: "Seattle, WA",
    jobType: "Full-time",
    description: "Create compelling content to drive our marketing automation tools and business growth.",
    requirements: "3+ years in content marketing. Excellent writing and SEO skills. Experience with SaaS is a plus.",
    salary: "$70,000 - $90,000"
  },
  {
    title: "Instructional Designer",
    company: "EduTech Solutions",
    location: "Austin, TX",
    jobType: "Full-time",
    description: "Design and develop engaging online learning experiences for our revolutionary educational platform.",
    requirements: "Experience in instructional design and e-learning development. Familiarity with learning management systems (LMS).",
    salary: "$80,000 - $100,000"
  },
  {
    title: "E-commerce Manager",
    company: "Retail Innovations",
    location: "San Francisco, CA",
    jobType: "Full-time",
    description: "Manage our e-commerce platform and drive online sales through innovative digital strategies.",
    requirements: "Proven experience in e-commerce management. Strong understanding of digital marketing and analytics.",
    salary: "$95,000 - $125,000"
  },
  {
    title: "Robotics Engineer",
    company: "Manufacturing Pro",
    location: "Detroit, MI",
    jobType: "Full-time",
    description: "Develop and implement advanced robotics for our automotive and industrial manufacturing lines.",
    requirements: "Degree in Mechanical Engineering, Robotics, or a related field. Experience with industrial robots and automation.",
    salary: "$110,000 - $150,000"
  },
  {
    title: "Machine Learning Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    description: "Design and build production-ready machine learning systems for our AI-powered products.",
    requirements: "Experience with Python, Scikit-learn, and cloud platforms like AWS or GCP. Strong software engineering fundamentals.",
    salary: "$130,000 - $160,000"
  },
  {
    title: "Digital Marketing Manager",
    company: "Growth Co.",
    location: "Remote",
    jobType: "Full-time",
    description: "Lead our digital marketing campaigns across all channels, including SEO, SEM, and social media.",
    requirements: "5+ years of experience in digital marketing. Proven track record of successful campaign management.",
    salary: "$90,000 - $115,000"
  },
  {
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Remote",
    jobType: "Contract",
    description: "Create wireframes, prototypes, and high-fidelity designs for our web and mobile applications.",
    requirements: "Strong portfolio showcasing UI/UX design skills. Proficiency in Figma and Adobe Creative Suite.",
    salary: "$85 - $110 per hour"
  },
  {
    title: "Financial Controller",
    company: "Finance Corp",
    location: "New York, NY",
    jobType: "Full-time",
    description: "Oversee all aspects of financial management, including corporate accounting, regulatory and financial reporting.",
    requirements: "CPA required. 7+ years of accounting and finance experience.",
    salary: "$120,000 - $150,000"
  },
  {
    title: "Curriculum Developer",
    company: "EduTech Solutions",
    location: "Austin, TX",
    jobType: "Full-time",
    description: "Develop engaging and effective educational content for our K-12 online learning platform.",
    requirements: "Background in education or curriculum development. Strong writing and editing skills.",
    salary: "$75,000 - $95,000"
  },
  {
    title: "Store Manager",
    company: "Retail Innovations",
    location: "San Francisco, CA",
    jobType: "Full-time",
    description: "Manage daily store operations, lead a team of associates, and ensure an exceptional customer experience.",
    requirements: "3+ years of retail management experience. Strong leadership and communication skills.",
    salary: "$65,000 - $85,000"
  },
  {
    title: "Frontend Developer",
    company: "WebTech Solutions",
    location: "Chicago, IL",
    jobType: "Full-time",
    description: "Build responsive and interactive user interfaces using modern JavaScript frameworks.",
    requirements: "3+ years experience with React, Vue, or Angular. Strong CSS and HTML skills.",
    salary: "$90,000 - $120,000"
  },
  {
    title: "Backend Engineer",
    company: "ServerStack Inc",
    location: "Boston, MA",
    jobType: "Full-time",
    description: "Design and implement scalable backend services and APIs for our growing platform.",
    requirements: "Experience with Node.js, Python, or Java. Knowledge of database systems and cloud services.",
    salary: "$100,000 - $130,000"
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps Technologies",
    location: "Remote",
    jobType: "Full-time",
    description: "Manage our cloud infrastructure and implement CI/CD pipelines for seamless deployments.",
    requirements: "Experience with AWS, Docker, Kubernetes, and infrastructure as code tools like Terraform.",
    salary: "$110,000 - $140,000"
  },
  {
    title: "Data Analyst",
    company: "DataInsights Corp",
    location: "Seattle, WA",
    jobType: "Full-time",
    description: "Transform raw data into actionable insights to drive business decisions.",
    requirements: "Proficiency in SQL, Excel, and data visualization tools like Tableau or Power BI.",
    salary: "$80,000 - $100,000"
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use environment variable or fall back to hardcoded connection string
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/careerbridge';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');
    
    // Insert new jobs
    await Job.insertMany(jobsData);
    console.log(`Added ${jobsData.length} jobs to the database`);
    
    // Disconnect from the database
    mongoose.disconnect();
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

// Run the seed function if this script is executed directly
if (require.main === module) {
  seedDatabase();
}

// Export the job data for use in other files
module.exports = { jobsData };