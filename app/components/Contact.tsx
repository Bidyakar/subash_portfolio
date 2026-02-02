'use client';

import { personalInfo } from '../data/portfolioData';
import { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-24 px-6 lg:px-8 bg-white transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-orange font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Let's Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy">
            Get In Touch
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div>
            <h3 className="text-3xl font-playfair font-semibold text-navy mb-6">
              Let's work together
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether it's community service, marketing collaboration, or youth development initiatives.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">Location</h4>
                  <p className="text-gray-600">{personalInfo.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">Phone</h4>
                  <p className="text-gray-600">{personalInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">Email</h4>
                  <p className="text-gray-600">{personalInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-semibold text-navy mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 focus:border-orange focus:outline-none transition-colors duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold text-navy mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 focus:border-orange focus:outline-none transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-semibold text-navy mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 focus:border-orange focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-navy text-white font-semibold tracking-wide hover:bg-orange transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
