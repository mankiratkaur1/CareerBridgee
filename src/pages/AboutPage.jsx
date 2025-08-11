import React from 'react';

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Mankirat Kaur',
            role: 'Developer',
            image: '👩‍💼',
            bio: 'Former tech executive with 15+ years of experience in talent acquisition and HR technology.',
            linkedin: '#'
        },
        {
            id: 2,
            name: 'Khushi Arora',
            role: 'Software Engineer',
            image: '👨‍💻',
            bio: 'Full-stack developer and technology leader passionate about building scalable solutions.',
            linkedin: '#'
        },
       
    ];

    const stats = [
        { number: '50K+', label: 'Active Job Seekers' },
        { number: '1K+', label: 'Partner Companies' },
        { number: '25K+', label: 'Successful Placements' },
        { number: '95%', label: 'Satisfaction Rate' }
    ];

    const values = [
        {
            title: 'Innovation',
            description: 'We continuously innovate to provide cutting-edge solutions for modern hiring challenges.',
            icon: '🚀'
        },
        {
            title: 'Transparency',
            description: 'We believe in open communication and honest feedback throughout the hiring process.',
            icon: '🔍'
        },
        {
            title: 'Diversity',
            description: 'We champion inclusive hiring practices that celebrate diverse perspectives and backgrounds.',
            icon: '🌈'
        },
        {
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from user experience to customer service.',
            icon: '⭐'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Career Bridge</h1>
                        <p className="text-xl mb-8 opacity-90">
                            We're revolutionizing the way people find jobs and companies find talent. 
                            Our mission is to create meaningful connections that drive career growth and business success.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-sm opacity-80">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Mission</h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-lg text-gray-700 mb-6">
                                    At Career Bridge, we believe that everyone deserves to find work that not only pays the bills 
                                    but also fulfills their passions and potential. We're building the most comprehensive job 
                                    platform that connects talented individuals with innovative companies.
                                </p>
                                <p className="text-lg text-gray-700 mb-6">
                                    Our platform goes beyond traditional job boards by providing personalized recommendations, 
                                    company insights, and career development resources to help job seekers make informed decisions.
                                </p>
                                <p className="text-lg text-gray-700">
                                    For employers, we offer advanced matching algorithms, comprehensive candidate profiles, 
                                    and streamlined hiring processes to find the perfect fit for their teams.
                                </p>
                            </div>
                            <div className="bg-indigo-50 rounded-lg p-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">What We Do</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-indigo-600 mr-3">✓</span>
                                        <span>Connect job seekers with their dream opportunities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-indigo-600 mr-3">✓</span>
                                        <span>Provide company insights and culture information</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-indigo-600 mr-3">✓</span>
                                        <span>Offer career development and skill-building resources</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-indigo-600 mr-3">✓</span>
                                        <span>Streamline the hiring process for employers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-indigo-600 mr-3">✓</span>
                                        <span>Foster diversity and inclusion in the workplace</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition duration-300">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition duration-300">
                                <div className="text-6xl mb-4">{member.image}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                                <a 
                                    href={member.linkedin} 
                                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                >
                                    View LinkedIn →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-16 bg-indigo-600 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Whether you're looking for your next opportunity or seeking top talent, 
                        we're here to help you succeed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300">
                            Post a Job
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
                            Browse Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage; 