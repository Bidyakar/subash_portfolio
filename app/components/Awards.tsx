'use client';

import { awards } from '../data/portfolioData';
import { useEffect, useRef, useState } from 'react';

const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const iconMap: Record<string, JSX.Element> = {
    trophy: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
      </svg>
    ),
    award: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    medal: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    star: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    certificate: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  };

  return (
    <section
      ref={sectionRef}
      id="awards"
      className={`py-24 px-6 lg:px-8 bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-orange font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Recognition
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900">
            Awards & Achievements
          </h2>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
            Celebrating milestones and recognitions earned through dedication and leadership
          </p>
        </div>

        {/* Centered Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="
                w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]
                bg-white rounded-3xl border border-orange/10
                p-10 text-center
                shadow-[0_15px_35px_-10px_rgba(249,115,22,0.2)]
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.4)]
                hover:border-orange/30
              "
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-orange/5 text-orange flex items-center justify-center">
                  {iconMap[award.icon]}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-playfair font-bold mb-3 text-slate-900">
                {award.title}
              </h3>

              {/* Year */}
              <div className="inline-block px-4 py-1.5 bg-orange/10 rounded-xl mb-4">
                <span className="text-orange font-bold text-sm tracking-wide">
                  {award.year}
                </span>
              </div>

              {/* Organization */}
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {award.organization}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;