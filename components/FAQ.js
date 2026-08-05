'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="section-title text-center">Frequently Asked Questions</h2>
      <p className="text-center text-gray-600 mb-10">
        Common questions about our services in Kenya
      </p>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="faq-question w-full"
              aria-expanded={openIndex === index}
            >
              <span className="pr-4 text-left">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 flex-shrink-0 text-primary-600" />
              ) : (
                <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="faq-answer px-4 pb-4">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}