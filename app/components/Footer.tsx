'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-white/70">
          &copy; {currentYear} Subash S Sapkota. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
