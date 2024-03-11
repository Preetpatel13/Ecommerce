// Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 p-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Column 1 - Navigation Menu */}
        <div className="space-y-4">
          <p className="text-lg font-semibold">Navigation</p>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800 transition duration-300">Home</a>
            </li>
            <li>
              <a href="/products" className="text-gray-600 hover:text-gray-800 transition duration-300">Products</a>
            </li>
            <li>
              <a href="/about" className="text-gray-600 hover:text-gray-800 transition duration-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-600 hover:text-gray-800 transition duration-300">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Column 2 - Connect with Us */}
        <div className="space-y-4">
          <p className="text-lg font-semibold">Connect with Us</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-gray-600 hover:text-gray-800 transition duration-300 text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-gray-600 hover:text-gray-800 transition duration-300 text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-gray-600 hover:text-gray-800 transition duration-300 text-2xl" />
            </a>
          </div>
        </div>

        {/* Column 3 - Contact Information */}
        <div className="space-y-4">
          <p className="text-lg font-semibold">Contact Us</p>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 text-2xl" />
            <p className="text-gray-600">info@example.com</p>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPhone} className="text-gray-600 text-2xl" />
            <p className="text-gray-600">+1 (123) 456-7890</p>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 text-2xl" />
            <p className="text-gray-600">123 Main St, Cityville, Country</p>
          </div>
        </div>

        {/* Column 4 - Additional Information */}
        <div className="space-y-4">
          <p className="text-lg font-semibold">Additional Info</p>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
