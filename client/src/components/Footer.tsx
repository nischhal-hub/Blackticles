import React from 'react'
import logo from '../assets/Blacticles_logo(dark).png'

const Footer = () => {
  return (
    <>
      <div className='h-96 border-2 border-black mt-10 bg-black'>
        <div className='w-full text-white text-nowrap flex justify-center font-sourceSerif'>
          <p className='w-[130%] tracking-widest'>{Array.from({ length: 20 }).map((_, i) => (<span key={i} className='font-light'> Blacktech Co. <span className='font-bold'> Blackticles </span></span>))}</p>
        </div>
        <div className='w-[80%] sm:w-[50%] mx-auto mt-8'>
          <div className='flex w-[60%] mx-auto'>
            <img src={logo} alt="logo" />
          </div>
          <p className='text-white text-center font-playFair font-thin mt-6'>Discover Blackticles, the innovative blogging app by a leading black tech company. Empowering voices, it brings diverse stories to the forefront. <span className='text-accent'>Join Blackticles</span> , where every story matters and representation thrives.</p>
          <div className='w-[30%] mx-auto flex justify-center mt-4'>
            <ul className='flex text-white space-x-3 font-playFair underline'>
              <li className='hover:text-accent transition'><a href="#">LinkdedIn</a></li>
              <li className='hover:text-accent transition'><a href="#">X</a></li>
              <li className='hover:text-accent transition'><a href="#">Instagram</a></li>
            </ul>
          </div>
          <p className='text-slate-500 text-xs font-bold text-center mt-4'>&copy; 2024-2028 BlackTech Co.</p>
          <p className='text-slate-500 text-xs font-bold text-center'>All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default Footer