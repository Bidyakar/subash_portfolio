'use client';

import { personalInfo } from '../data/portfolioData';
import Image from 'next/image';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-gradient-radial from-orange/10 to-transparent animate-float" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left content */}
        <div className="space-y-6 animate-fade-in-up">
          <div
            className="text-orange font-semibold text-sm tracking-[0.2em] uppercase opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {personalInfo.title}
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-playfair font-black text-navy leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {personalInfo.firstName} <br />
            <span className="text-gradient">{personalInfo.lastName}</span>
          </h1>

          <p
            className="text-lg text-gray-600 leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            {personalInfo.description}
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 py-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.9s' }}
          >
            {personalInfo.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-orange">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.1s' }}
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-navy text-white font-semibold tracking-wide hover:bg-orange transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-4 border-2 border-navy text-navy font-semibold tracking-wide hover:bg-navy hover:text-white transition-all duration-300"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Right content - Image + Social */}
        <div
          className="relative opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="relative w-full h-[600px] rounded-sm overflow-hidden">
            {/* Decorative border */}
            <div className="absolute top-5 left-5 right-[-20px] bottom-[-20px] border-[3px] border-orange -z-10" />

            {/* Hero Image */}
            <Image
              src="/images/sss.jpg"
              alt="Subash Sharma Sapkota"
              fill
              className="object-cover grayscale-[20%]"
              priority
            />
          </div>

          {/* Social Links */}
          <div
            className="absolute bottom-8 right-8 flex gap-3 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.3s' }}
          >
            {Object.entries(personalInfo.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white flex items-center justify-center text-navy hover:bg-orange hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                {/* Simple placeholder icons using SVG */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {key === 'linkedin' && (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  )}
                  {key === 'facebook' && (
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  )}
                  {key === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
