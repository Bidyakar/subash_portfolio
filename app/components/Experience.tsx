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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`py-30 px-6 lg:px-8 bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="max-w-7xl mx-auto pb-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="text-orange font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            My Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900">
            Professional Experience
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Bolder Vertical Center Line - Fixed consistency */}
          <div
            className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-orange/20 transition-all duration-[100ms] origin-top ${isVisible ? 'scale-y-100' : 'scale-y-0'
              }`}
          />

          {/* Progress Overlay Line - Bright Orange */}
          <div
            className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-orange transition-all duration-[100ms] origin-top ${isVisible ? 'scale-y-100' : 'scale-y-0'
              }`}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center justify-between md:justify-normal w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Content Card with Bold Constant Shadow */}
                <div
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transitionDuration: '300ms'
                  }}
                  className={`w-full md:w-[45%] p-8 bg-white border border-orange/20 rounded-3xl transition-all shadow-[0_15px_35px_-10px_rgba(249,115,22,0.25)] group hover:border-orange/50 hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.45)] ${isVisible
                    ? 'translate-x-0 opacity-100'
                    : index % 2 === 0 ? '-translate-x-16 opacity-0' : 'translate-x-16 opacity-0'
                    } ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className="text-orange font-extrabold text-sm mb-2 tracking-wider">
                    {exp.date}
                  </div>
                  <h3 className={`text-2xl font-playfair font-bold text-slate-900 mb-2 group-hover:text-orange transition-colors duration-300 ${isVisible ? 'animate-glow-reveal' : ''}`}>
                    {exp.title}
                  </h3>
                  <h4 className="text-slate-600 font-bold mb-4 italic">
                    {exp.company}
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base font-medium">
                    {exp.description}
                  </p>
                </div>

                {/* Bold Center dot */}
                <div
                  style={{ transitionDelay: `${(index * 200) + 100}ms` }}
                  className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange rounded-full border-4 border-white shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;