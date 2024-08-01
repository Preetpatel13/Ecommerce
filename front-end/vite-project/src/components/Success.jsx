// Success.js
import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="text-green-500 mb-4">
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
              d="M9 12l2 2l4-4m0 0a7.978 7.978 0 1 0 2.846 2.828"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-8">
          Thank you for your purchase. Your transaction was successful.
        </p>
        <Link
          to="/"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
