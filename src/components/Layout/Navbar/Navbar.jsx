import React from 'react';

// import './navbar.css'

export default function Navbar() {
  return (
    <div className='absolute w-full border-t-4 border-blue-500 bg-white mb-5'>
      <div className='border-b border-gray-300'>
        <div className='flex max-w-6xl mx-auto'>
          <span className='py-4 px-4 text-2xl font-semibold text-blue-500'>
            PopeClient
          </span>
        </div>
      </div>
    </div>
  );
}
