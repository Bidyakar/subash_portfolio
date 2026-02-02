'use client';

import { experiences } from '../data/portfolioData';
import { useEffect, useRef, useState } from 'react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`py-24 px-6 lg:px-8 bg-white transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-orange font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            My Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy">
            Professional Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange via-orange/50 to-transparent" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-[45%] p-6 bg-gray-50 hover:bg-white transition-all duration-300 hover:shadow-xl group ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  <div className="text-orange font-semibold text-sm mb-2 tracking-wider">
                    {exp.date}
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold text-navy mb-2 group-hover:text-orange transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <h4 className="text-gray-600 font-medium mb-3">
                    {exp.company}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange rounded-full border-4 border-white shadow-lg z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
