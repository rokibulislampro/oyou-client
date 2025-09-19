import React from 'react';
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-padding w-full bg-gray-100 text-gray-700 text-sm fixed bottom-0 left-0 shadow-inner flex justify-between items-center">
      {/* Left side */}
      <div>&copy; {new Date().getFullYear()} OYOU. All rights reserved.</div>

      {/* Right side links */}
      <div className="flex gap-4">
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
