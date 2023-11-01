import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <div className='mt-32'>
        <p className='text-4xl text-center mb-4 font-semibold'>Welcome!</p>
        <p className='text-sm text-center'>MERN STACK</p>
      </div>
      <div className='text-center mt-36 transition duration-1000 ease-in-out '>
        <Link to='/about'>
          <button className='bg-slate-700 px-7 py-2 rounded-full font-semi-bold text-white hover:opacity-90 '>About</button>
        </Link>
      </div>
    </div>
  )
}

export default Home