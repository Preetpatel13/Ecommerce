import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(prevState => !prevState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="">
        <h2 className="text-3xl font-semibold mb-4 text-center" style={{ letterSpacing: '0.1em',wordSpacing:'0.2em' }}>Welcome to TimEStacK</h2>
 {isLogin ? <Login /> : <Register />}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span className="text-gray-500 cursor-pointer" onClick={toggleForm}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
