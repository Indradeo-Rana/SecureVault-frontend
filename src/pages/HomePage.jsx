import React from 'react'

function HomePage() {
  return (
    
     <div className=" flex flex-col items-center min-h-screen flex items-center justify-center br bg-gray-100">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text  backdrop-blur-sm p-4 rounded-lg shadow-lg">
        SecureVault
      </h1>

      <div className='block mt-8'>
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4'>
          <a href="/login">Login</a>
        </button>
        <button className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4 ml-4'>
          <a href="/register">Register</a>
        </button>
        
      </div>
    </div>
  )
}

export default HomePage