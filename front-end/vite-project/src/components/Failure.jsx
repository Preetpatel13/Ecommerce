// Failure.js
import React from 'react';
import { Link } from 'react-router-dom';

const Failure = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v6m0 4h.01M5 13l4-4m6 0l4 4"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Failed!</h1>
        <p className="text-gray-700 mb-8">
          Unfortunately, there was an issue with your transaction.
        </p>
        <Link
          to="/checkout"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default Failure;
