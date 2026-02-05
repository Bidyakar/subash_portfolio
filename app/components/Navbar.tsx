'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only update active section on home page
      if (pathname === '/') {
        const sections = ['home', 'about', 'experience', 'projects', 'awards', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 200 && rect.bottom >= 200;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
  ];

  // Smooth scroll handle
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
    }
    // If not on '/', Link will naturally navigate to '/#id'
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
  ${isScrolled
          ? 'bg-white/95 nav-blur shadow-lg py-1'
          : 'bg-white/80 nav-blur'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-1">
          <Link
            href="/#home"
            className="flex items-center cursor-pointer group"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <Image
              src="/images/sss.svg"
              alt="Subash S. Sapkota Logo"
              width={80}
              height={80}
              className="transition-transform duration-300 group-hover:scale-110 object-contain "
              priority
            />
          </Link>

          <ul className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.id === 'home' ? '/' : `/#${link.id}`}
                  className={`relative font-medium text-sm tracking-wide cursor-pointer transition-colors duration-300 ${activeSection === link.id
                    ? 'text-orange'
                    : 'text-gray-700 hover:text-orange'
                    }`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-orange transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0'}`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button className="md:hidden text-navy">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
