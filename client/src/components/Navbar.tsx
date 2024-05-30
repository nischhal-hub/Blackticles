import React, { ChangeEvent, useState } from 'react'
import logo from '../assets/Blackticles_logo.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import { links } from '../navlinks';
import { TLinks } from '../type';

const Navbar = () => {
  const [inputTerm, setInputTerm] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const variantSidebar = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }
  const variantSidebar2 = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }
  const variantButton = {
    open: { opacity: 0, x: "-100%" },
    closed: { opacity: 1, x: 0 }
  }
  const variantCloseButton = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTerm(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputTerm && e.key === 'Enter') {
      navigate(`/search/${inputTerm}`)
      setInputTerm("")
    } else {
      return
    }
  }


  return (
    <>
      <nav className='flex justify-between items-center p-2 border-solid border-b-2 mx-2'>
        <div className='w-56' >
          <img src={logo} alt="Blackticles Logo" className='object-contain' />
        </div>


        {/* Sidebar */}
        <motion.div
          animate={isSidebarOpen ? "open" : "closed"}
          variants={variantSidebar}
          transition={{ duration: .3 }}
          className='fixed bg-[rgba(0,0,0,0.5)] w-[120%] h-screen top-0 right-0 z-20'>
        </motion.div>
        <motion.div
          animate={isSidebarOpen ? "open" : "closed"}
          variants={variantSidebar2}
          transition={{ duration: .2 }}
          className='fixed right-0 top-0 w-[50%] h-screen bg-[#fafafa] z-30'>
          <ul className='font-playFair space-y-8 text-lg font-medium mt-16 ml-6'>
            {links.map((link:TLinks, i:number) => (<p className='relative' key={i}><NavLink className={({ isActive }) =>
              isActive ? "anchorline2" : "anchorline"
            } to={link.url} onClick={() => setIsSidebarOpen(v => !v)}><li className='flex items-center'><span className='text-xl mr-2'>{link.icon}</span>{link.label}</li></NavLink></p>
            ))}
          </ul>
        </motion.div>
        {/* mobile search */}
        <div className='md:hidden text-2xl flex space-x-4 relative'>
          <CiSearch onClick={() => navigate('/search')} className='mr-8' />
          <motion.div
            animate={isSidebarOpen ? "open" : "closed"}
            variants={variantButton}
            className='z-50'
          >
            <RxHamburgerMenu onClick={() => setIsSidebarOpen(v => !v)} className='absolute z-40 right-1' />
          </motion.div>
          <motion.div
            animate={isSidebarOpen ? "open" : "closed"}
            variants={variantCloseButton}
            className='z-50'
          >
            <IoMdClose onClick={() => setIsSidebarOpen(v => !v)} className='absolute z-50 right-5 text-3xl' />
          </motion.div>
        </div>
        {/* sidebar end */}


        {/* search and navlinks*/}
        <div className='hidden md:flex md:justify-between md:items-center mr-4 w-[75%]'>
          <div className='relative sm:ml-6 '>
            <CiSearch className='absolute text-slate-500 top-2 left-1' />
            <input type="text" value={inputTerm} onChange={handleChange} className='bg-slate-100 border-[1px] border-solid border-slate-200 font-grot pl-6 w-64 px-2 py-1 focus:outline-slate-300' placeholder='Search' onKeyDown={handleKeyPress} />
          </div>
          <ul className='flex font-playFair space-x-8 text-lg font-medium'>
            {links.map((link, i) => (<p key={i} className='relative'><NavLink className={({ isActive }) =>
              isActive ? "anchorline2" : "anchorline"
            } to={link.url}><li>{link.label}</li></NavLink></p>))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar