import React from 'react';
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-gray-900 text-gray-300'>
      <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8'>
        
        {/* LEFT SECTION - Brand Identity */}
        <div>
          <h1 className='w-full text-3xl font-bold text-green-500'>
            TaskFlow
          </h1>

          <p className='py-4 text-gray-400'>
            Empowering teams to stay organized and productive. Create projects, 
            assign tasks, and monitor real-time progress with secure 
            role-based access control.
          </p>

          <div className='flex gap-6 my-6 text-gray-400'>
            <FaFacebookSquare size={28} className='hover:text-green-500 cursor-pointer transition' />
            <FaInstagram size={28} className='hover:text-green-500 cursor-pointer transition' />
            <FaTwitterSquare size={28} className='hover:text-green-500 cursor-pointer transition' />
            <FaGithubSquare size={28} className='hover:text-green-500 cursor-pointer transition' />
          </div>
        </div>

        {/* RIGHT SECTION - Navigation Links */}
        <div className='lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 mt-6'>

          <div>
            <h6 className='font-semibold text-gray-400 mb-4'>Product</h6>
            <ul>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Project Tracking</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Team Management</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Task Assignment</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Role Security</li>
            </ul>
          </div>

          <div>
            <h6 className='font-semibold text-gray-400 mb-4'>Support</h6>
            <ul>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Documentation</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>API Status</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>System Requirements</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Contact Dev</li>
            </ul>
          </div>

          <div>
            <h6 className='font-semibold text-gray-400 mb-4'>Company</h6>
            <ul>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>About TaskFlow</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Portfolio</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Tech Stack</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>GitHub</li>
            </ul>
          </div>

          <div>
            <h6 className='font-semibold text-gray-400 mb-4'>Legal</h6>
            <ul>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Privacy Policy</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Terms of Service</li>
              <li className='py-2 text-sm hover:text-green-500 cursor-pointer'>Security Data</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Line */}
      <div className='text-center py-6 border-t border-gray-800 text-gray-500 text-sm'>
        © 2026 TaskFlow Manager. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;