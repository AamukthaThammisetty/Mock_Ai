'use client'
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button'; // Adjust the import based on your file structure
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../../../components/ui/accordion'; // Adjust the import based on your file structure

const FAQComponent = () => {
    const [faqData] = useState([
        {
            question: 'What is the purpose of this component?',
            answer: 'This component is designed to provide information and answer frequently asked questions in a toggleable format.',
        },
        {
            question: 'How do I use this component?',
            answer: 'You can simply import it and render it in your application. Clicking on a question will toggle its visibility.',
        },
        {
            question: 'Can I add more questions?',
            answer: 'Yes! You can modify the `faqData` array to include more questions and answers as needed.',
        },
    ]);

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
                {faqData.map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionTrigger className="flex justify-between items-center p-4 border-b border-gray-200">
                            <span className="font-semibold">{item.question}</span>
                            <Button variant="outline">Toggle</Button>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 text-gray-700">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQComponent;
