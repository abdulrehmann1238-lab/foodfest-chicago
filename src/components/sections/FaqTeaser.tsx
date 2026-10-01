import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { FESTIVAL_FAQS } from '../../data/faqs';
import { Button } from '../ui/Button';

export const FaqTeaser: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const teaserFaqs = FESTIVAL_FAQS.slice(0, 4);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="container-custom max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2F5D62]">
            COMMON QUESTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-2 mb-3">
            Everything you need to know.
          </h2>
          <p className="text-sm text-[#80766A]">
            Quick answers regarding tickets, wristbands, dietary options, and logistics.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {teaserFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-[var(--r-md)] border border-[#E4DCCF] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#1D1A17] hover:text-[#B9502F] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#80766A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B9502F]' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-250 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-xs sm:text-sm text-[#4A433B] leading-relaxed font-sans border-t border-[#F7F2E9] pt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link to="/visit#faqs">
            <Button
              size="md"
              variant="outline"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Full FAQ & Travel Guide
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
