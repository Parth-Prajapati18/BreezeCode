"use client"
import React from 'react';
import LoginForm from './loginForm';

const LoginPage = () => {
  return (
    <div className='bg-MC2 h-auto'>
    <div className="flex flex-col justify-center max-h-screen h-2/3">
      <h2 className='my-3 mx-1 md:mt-8 md:mb-3 text-lg md:text-3xl font-medium uppercase text-center font-mono overflow-hidden'>
        Login
      </h2>
      <LoginForm />
    </div>
    </div>
  );
};

export default LoginPage;