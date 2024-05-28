import React from 'react'
import logo from '../assets/Blackticles_logo.png'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <>
      <nav className='flex justify-between items-center p-2 border-solid border-b-2 mx-2'>
        <div className='w-56' >
          <img src={logo} alt="Blackticles Logo" className='object-contain'/>
        </div>
        <div className='md:hidden text-2xl'>
          <RxHamburgerMenu />
        </div>
        <div className='hidden md:block transition-all mr-4'>
          <ul className='flex font-playFair space-x-8 text-lg font-medium'>
            <li>Blog</li>
            <li>Search</li>
            <li>About</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar