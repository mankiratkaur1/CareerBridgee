import React from 'react';
import SuccessStoryCard from './SuccessStoryCard';

const mockReviews = [
    { id: 1, name: 'Mankirat Kaur', jobTitle: 'Software Engineer', rating: 5, comment: '"Career Bridge made my job search incredibly easy. I found my dream job in just two weeks! The platform is intuitive and the company reviews are a game-changer."', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AJ' },
    { id: 2, name: 'Khushi Arora', jobTitle: 'UX Designer', rating: 5, comment: '"The resume upload feature is fantastic. I got interview requests just hours after updating my profile. Highly recommended for any tech professional."', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=DC' },
    { id: 3, name: 'Kashish Wadhawan', jobTitle: 'Data Analyst', rating: 4, comment: '"A great resource for finding quality job postings. The user reviews helped me choose a company with a great work culture. I wish there were more filtering options, but overall a great experience."', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=MG' },
];

const SuccessStories = () => (
    <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Success Stories from Our Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockReviews.map(review => <SuccessStoryCard key={review.id} review={review} />)}
            </div>
        </div>
    </section>
);

export default SuccessStories;