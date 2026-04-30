import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-900 text-white'>
      <div className='max-w-[900px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center px-4'>
        
        {/* Project Tagline */}
        <p className='text-green-400 font-bold p-2 uppercase tracking-wide'>
          Streamline Your Workflow
        </p>

        {/* Main Heading */}
        <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:py-6'>
          Manage Teams. Track Tasks.
        </h1>

        {/* Animated Feature List */}
        <div className='flex justify-center items-center flex-wrap'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>
            Optimize your
          </p>

          <TypeAnimation
            sequence={[
              ' Projects',
              2000,
              ' Team Tasks',
              2000,
              ' Deadlines',
              2000,
              ' Roles & Access',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className='md:text-4xl sm:text-3xl text-xl font-bold text-green-400 md:pl-4 pl-2'
          />
        </div>

        {/* Description updated for Team Task Manager Requirements */}
        <p className='md:text-xl text-lg text-gray-400 max-w-[700px] mx-auto'>
          Build projects, assign tasks to members, and track progress in real-time. 
          Use role-based access to keep your team organized and your data secure.
        </p>

        {/* Call to Action - Redirects to Signup */}
        <button
          onClick={() => navigate('/signup')}
          className='bg-green-500 w-[200px] rounded-md font-semibold my-8 mx-auto py-3 text-black hover:bg-green-400 transition duration-300 shadow-lg hover:shadow-green-500/30'
        >
          Start Managing
        </button>

      </div>
    </div>
  );
};

export default Hero;