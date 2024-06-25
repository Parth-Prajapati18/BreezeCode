"use client"
import React from 'react';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div className='bg-MC2 h-auto mt-2'>
    <div className="flex flex-col justify-center max-h-screen h-2/3">
      <h2 className='my-3 mx-1 md:mt-8 md:mb-3 text-lg md:text-3xl font-medium uppercase text-center font-mono overflow-hidden'>
        Sign Up
      </h2>
      <SignUpForm />
    </div>
    </div>
  );
};

export default SignUpPage;