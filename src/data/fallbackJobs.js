// Fallback jobs data to display when API calls fail
const fallbackJobs = [
  {
    _id: "fb-001",
    title: "AI Research Scientist",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "full-time",
    category: "technology",
    salary: "$140,000 - $180,000",
    description: "Join our AI team to work on cutting-edge machine learning models and solutions that redefine industries.",
    requirements: "PhD or MS in Computer Science, specializing in AI/ML. Strong experience with Python, TensorFlow, or PyTorch.",
    postedDate: "2023-10-20"
  },
  {
    _id: "fb-002",
    title: "Registered Nurse (Telehealth)",
    company: "HealthCare Plus",
    location: "New York, NY",
    jobType: "full-time",
    category: "healthcare",
    salary: "$90,000 - $110,000",
    description: "Provide patient-centered care through our innovative digital health platform. Must be a licensed RN.",
    requirements: "Valid RN license. 2+ years of clinical experience. Experience with telehealth platforms is a plus.",
    postedDate: "2023-10-18"
  },
  {
    _id: "fb-003",
    title: "Investment Banking Analyst",
    company: "Finance Corp",
    location: "New York, NY",
    jobType: "full-time",
    category: "finance",
    salary: "$100,000 - $130,000",
    description: "Analyze financial data, build models, and support senior bankers in executing M&A and capital raising transactions.",
    requirements: "Bachelor's degree in Finance or a related field. Strong analytical and quantitative skills.",
    postedDate: "2023-10-22"
  },
  {
    _id: "fb-004",
    title: "Senior Product Designer",
    company: "Design Studio",
    location: "Remote",
    jobType: "full-time",
    category: "design",
    salary: "$110,000 - $140,000",
    description: "Lead the design of meaningful digital experiences for our clients. A strong portfolio is required.",
    requirements: "5+ years of experience in UX/UI design. Proficiency in Figma, Sketch, and Adobe Creative Suite.",
    postedDate: "2023-10-25"
  },
  {
    _id: "fb-005",
    title: "Content Marketing Specialist",
    company: "Growth Co.",
    location: "Seattle, WA",
    jobType: "full-time",
    category: "marketing",
    salary: "$70,000 - $90,000",
    description: "Create compelling content to drive our marketing automation tools and business growth.",
    requirements: "3+ years in content marketing. Excellent writing and SEO skills. Experience with SaaS is a plus.",
    postedDate: "2023-10-15"
  },
  {
    _id: "fb-006",
    title: "Instructional Designer",
    company: "EduTech Solutions",
    location: "Austin, TX",
    jobType: "full-time",
    category: "education",
    salary: "$80,000 - $100,000",
    description: "Design and develop engaging online learning experiences for our revolutionary educational platform.",
    requirements: "Experience in instructional design and e-learning development. Familiarity with learning management systems (LMS).",
    postedDate: "2023-10-12"
  },
  {
    _id: "fb-007",
    title: "E-commerce Manager",
    company: "Retail Innovations",
    location: "San Francisco, CA",
    jobType: "full-time",
    category: "retail",
    salary: "$95,000 - $125,000",
    description: "Manage our e-commerce platform and drive online sales through innovative digital strategies.",
    requirements: "Proven experience in e-commerce management. Strong understanding of digital marketing and analytics.",
    postedDate: "2023-10-19"
  },
  {
    _id: "fb-008",
    title: "Robotics Engineer",
    company: "Manufacturing Pro",
    location: "Detroit, MI",
    jobType: "full-time",
    category: "technology",
    salary: "$110,000 - $150,000",
    description: "Develop and implement advanced robotics for our automotive and industrial manufacturing lines.",
    requirements: "Degree in Mechanical Engineering, Robotics, or a related field. Experience with industrial robots and automation.",
    postedDate: "2023-10-10"
  },
  {
    _id: "fb-009",
    title: "Machine Learning Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "full-time",
    category: "technology",
    salary: "$130,000 - $160,000",
    description: "Design and build production-ready machine learning systems for our AI-powered products.",
    requirements: "Experience with Python, Scikit-learn, and cloud platforms like AWS or GCP. Strong software engineering fundamentals.",
    postedDate: "2023-10-28"
  },
  {
    _id: "fb-010",
    title: "Digital Marketing Manager",
    company: "Growth Co.",
    location: "Remote",
    jobType: "full-time",
    category: "marketing",
    salary: "$90,000 - $115,000",
    description: "Lead our digital marketing campaigns across all channels, including SEO, SEM, and social media.",
    requirements: "5+ years of experience in digital marketing. Proven track record of successful campaign management.",
    postedDate: "2023-10-27"
  },
  {
    _id: "fb-011",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Remote",
    jobType: "contract",
    category: "design",
    salary: "$85 - $110 per hour",
    description: "Create wireframes, prototypes, and high-fidelity designs for our web and mobile applications.",
    requirements: "Strong portfolio showcasing UI/UX design skills. Proficiency in Figma and Adobe Creative Suite.",
    postedDate: "2023-10-26"
  },
  {
    _id: "fb-012",
    title: "Financial Controller",
    company: "Finance Corp",
    location: "New York, NY",
    jobType: "full-time",
    category: "finance",
    salary: "$120,000 - $150,000",
    description: "Oversee all aspects of financial management, including corporate accounting, regulatory and financial reporting.",
    requirements: "CPA required. 7+ years of accounting and finance experience.",
    postedDate: "2023-10-24"
  },
  {
    _id: "fb-013",
    title: "Curriculum Developer",
    company: "EduTech Solutions",
    location: "Austin, TX",
    jobType: "full-time",
    category: "education",
    salary: "$75,000 - $95,000",
    description: "Develop engaging and effective educational content for our K-12 online learning platform.",
    requirements: "Background in education or curriculum development. Strong writing and editing skills.",
    postedDate: "2023-10-21"
  },
  {
    _id: "fb-014",
    title: "Store Manager",
    company: "Retail Innovations",
    location: "San Francisco, CA",
    jobType: "full-time",
    category: "retail",
    salary: "$65,000 - $85,000",
    description: "Manage daily store operations, lead a team of associates, and ensure an exceptional customer experience.",
    requirements: "3+ years of retail management experience. Strong leadership and communication skills.",
    postedDate: "2023-10-18"
  }
];

export default fallbackJobs;