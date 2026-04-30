import React from 'react';
// Replace with a project management or data dashboard image from your assets

const Analytics = () => {
  return (
    <div className='w-full bg-white py-20 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-12 items-center'>
        
        {/* Image Section */}
        

        {/* Text Section */}
        <div className='flex flex-col justify-center'>
          <p className='text-green-600 font-bold uppercase tracking-wide'>
            Insightful Team Management
          </p>

          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-3'>
            Track Projects, Status, and Deadlines
          </h1>

          <p className='text-gray-600'>
            Manage your team's workload with a centralized dashboard designed 
            for clarity. Create projects, assign tasks to members, and track 
            real-time status updates from "To-Do" to "Done". Stay on top of 
            your timeline with automated tracking of overdue tasks and progress metrics.
          </p>

          <p className='text-gray-600 mt-4'>
            Visualize team efficiency and project health at a glance. Our 
            role-based access ensures that Admins have full control over 
            project creation, while Members focus on completing their assigned 
            objectives.
          </p>

          <button className='bg-green-600 text-white w-[200px] rounded-md font-medium my-6 py-3 hover:bg-green-700 transition'>
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default Analytics;