'use client'
import React, { useState } from 'react';
import {FeedbackAlertsComponent} from "./_components/feedbackAlert";

const FeedbackComponent = () => {
    // Sample feedback data
    const feedbackData = [
        {
            question: 'How would you rate your experience?',
            answer: 'I found the session very informative.',
            userAnswer: 'I would rate it a 5 out of 5.',
            feedback: 'Great job! Keep up the good work.',
            score: 5,
        },
        {
            question: 'What could be improved?',
            answer: 'More examples could enhance understanding.',
            userAnswer: 'I would suggest more interactive elements.',
            feedback: 'Thank you for your input!',
            score: 3,
        },
        {
            question: 'Would you recommend this to others?',
            answer: 'It was not very helpful.',
            userAnswer: 'I would not recommend it.',
            feedback: 'Needs significant improvement.',
            score: 1,
        },
        // Add more feedback items as needed
    ];


    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="accordion-collapse" className="mx-auto p-8 flex flex-col items-start w-full  rounded-lg  ">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Congratulations!</h2>
            <h3 className="text-lg text-gray-700 mb-2 text-center">Here is your interview feedback</h3>
            <p className="text-center text-gray-600 mb-4">Your overall interview rating: <span className="font-bold text-blue-500">7/10</span></p>
            <p className="text-center text-gray-600 mb-8">Find below the interview questions with correct answers, your answers, and suggestions to improve.</p>
            {feedbackData.map((item, index) => (
                <div key={index} className="mb-4 w-full">
                    <h2 id={`accordion-collapse-heading-${index}`}>
                        <button
                            type="button"
                            className="flex items-center justify-between w-full p-4 font-medium text-gray-700  rounded-lg transition-colors duration-200 border border-gray-300 shadow-sm gap-3"
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`accordion-collapse-body-${index}`}
                        >
                            <span>{item.question}</span>
                            <svg
                                data-accordion-icon
                                className={`w-3 h-3 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id={`accordion-collapse-body-${index}`}
                        className={`${openIndex === index ? '' : 'hidden'}`}
                        aria-labelledby={`accordion-collapse-heading-${index}`}
                    >
                        <div className="p-5 bg-white border border-gray-200 rounded-b-lg shadow-sm">
                            <p className="font-semibold text-blue-600">Your Answer:</p>
                            <p className="text-gray-700">{item.userAnswer}</p>
                            <p className="font-semibold text-blue-600 mt-4">Feedback:</p>
                            <FeedbackAlertsComponent feedbackItem={item} />
                            <p className="font-semibold text-blue-600 mt-4">Score: <span className="text-gray-800">{item.score}</span></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default FeedbackComponent;
