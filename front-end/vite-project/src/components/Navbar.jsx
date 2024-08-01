import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faShoppingBag, faHeart, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { username, isAuthenticated, logout } = useAuth(); // Now includes isAuthenticated

  return (
    <nav className="bg-gray-100 text-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/" className="text-2xl font-bold">
          TimEStacK
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition duration-300">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-700 hover:text-gray-900 transition duration-300">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className="hidden md:inline">Profile {username && `(${username})`}</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-gray-700 hover:text-gray-900 transition duration-300">
              <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
              <span className="hidden md:inline">Cart</span>
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900 transition duration-300">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              <span className="hidden md:inline">Wishlist</span>
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-gray-900 transition duration-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-gray-900 transition duration-300">
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-gray-900 transition duration-300">
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
