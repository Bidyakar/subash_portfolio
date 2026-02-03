'use client';

import { personalInfo } from '../data/portfolioData';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] bg-gradient-radial from-orange/10 to-transparent animate-float" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">

        {/* Left content */}
        <div className="flex flex-col justify-center animate-fade-in-up">
          <div
            className="text-orange font-semibold text-sm tracking-[0.2em] uppercase mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {personalInfo.title}
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-playfair font-black text-navy leading-tight mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {personalInfo.name.split(' ')[0]} <br />
            <span className="text-gradient">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p
            className="text-lg text-gray-600 leading-relaxed max-w-xl mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            {personalInfo.description}
          </p>

          {/* Stats Section */}
          <div
            className="flex flex-wrap gap-10 py-6 mb-4 opacity-0 animate-fade-in border-y border-gray-200/60"
            style={{ animationDelay: '0.9s' }}
          >
            {personalInfo.stats.map((stat, index) => (
              <div key={index} className="text-left">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-orange">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Adjusted Margin Below */}
          <div
            className="flex flex-wrap gap-6 mt-12 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.1s' }}
          >
            <a
              href="#contact"
              className="px-10 py-4 bg-navy text-white font-semibold tracking-wide hover:bg-orange transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-orange/20"
            >
              Get In Touch
            </a>

            <Link
              href="/blog"
              className="px-10 py-4 border-2 border-orange text-orange font-semibold tracking-wide hover:bg-orange hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Read My Blog
            </Link>
          </div>
        </div>

        {/* Right content - Image + Social (Now correctly outside the left div) */}
        <div
          className="relative opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="relative w-full aspect-[4/5] md:h-[600px] rounded-none overflow-hidden shadow-2xl">
            {/* Decorative border */}
            <div className="absolute top-6 left-6 right-[-24px] bottom-[-24px] border-[4px] border-orange -z-10" />

            {/* Hero Image */}
            <Image
              src="/images/sss.jpg"
              alt="Subash S Sapkota"
              fill
              className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>

          {/* Social Links Container */}
          <div
            className="absolute bottom-6 right-6 flex flex-row items-center gap-3 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.3s' }}
          >
            {Object.entries(personalInfo.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/95 backdrop-blur-md flex items-center justify-center text-navy hover:bg-orange hover:text-white transition-all duration-300 transform hover:-translate-y-2 shadow-xl border border-gray-100"
                title={key}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {key === 'linkedin' && (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  )}
                  {key === 'facebook' && (
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  )}
                  {key === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-10.406a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  )}
                  {key === 'youtube' && (
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  )}
                  {key === 'tiktok' && (
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14 1.01.23 2.08.94 2.79.76.82 1.88 1.22 2.99 1.09 1.34-.11 2.5-1.11 2.86-2.4.09-.34.13-.69.13-1.04-.01-4.67.01-9.33-.02-14z" />
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