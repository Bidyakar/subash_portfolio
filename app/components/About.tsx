'use client';

import { about } from '../data/portfolioData';
import { useEffect, useRef, useState } from 'react';

const About = () => {
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

  const iconMap: { [key: string]: JSX.Element } = {
    users: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    bullhorn: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    microphone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    calendar: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`py-24 px-6 lg:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-orange font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Who I Am
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy">
            About Me
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Text */}
          <div className="space-y-6">
            <h3 className="text-3xl font-playfair font-semibold text-navy">
              {about.title}
            </h3>
            {about.paragraphs.map((para, index) => (
              <p key={index} className="text-gray-600 leading-relaxed text-lg">
                {para}
              </p>
            ))}
          </div>

          {/* Right - Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {about.skills.map((skill, index) => (
              <div
                key={index}
                // rounded-2xl for soft corners
                // border-gray-100 for a subtle, non-sharp outline
                // Removed all 'hover' and 'group-hover' classes
                className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300"
              >
                <div className="text-orange mb-4">
                  {iconMap[skill.icon]}
                </div>
                <h4 className="text-lg font-semibold text-navy mb-2">
                  {skill.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;