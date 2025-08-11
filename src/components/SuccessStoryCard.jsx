import React from 'react';
import { StarIcon } from './icons';

const SuccessStoryCard = ({ review }) => (
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-indigo-500">
        <img src={review.avatar} alt={review.name} className="w-24 h-24 rounded-full mb-4 ring-4 ring-indigo-100" />
        <div className="flex mb-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
        </div>
        <p className="text-gray-600 italic mb-4">{review.comment}</p>
        <h4 className="font-bold text-gray-800">{review.name}</h4>
        <p className="text-sm text-gray-500">{review.jobTitle}</p>
    </div>
);

export default SuccessStoryCard;
