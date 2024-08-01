import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/register', {
        username,
        email,
        password,
      });
      login(username);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.error('Registration failed: Please check your registration data');
        } else {
          console.error('Registration failed:', error.response.data.message);
        }
      } else if (error.request) {
        console.error('Registration failed: No response received from server');
      } else {
        console.error('Registration failed:', error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-600">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="flex justify-center mb-4">
          <img
            src="data:image/png;base64,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"
            alt="Logo"
            className="h-20 w-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
