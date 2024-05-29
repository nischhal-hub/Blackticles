import React, { ChangeEvent, useState } from 'react'
import logo from '../assets/Blackticles_logo.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [inputTerm, setInputTerm] = useState("")
  const navigate = useNavigate()
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
        <div className='md:hidden text-2xl flex space-x-4'>
          <CiSearch onClick={()=>navigate('/search')}/>
          <RxHamburgerMenu />

        </div>
        <div className='hidden md:flex md:justify-between md:items-center mr-4 w-[75%]'>
          <div className='relative sm:ml-6 '>
            <CiSearch className='absolute text-slate-500 top-2 left-1' />
            <input type="text" value={inputTerm} onChange={handleChange} className='bg-slate-100 border-[1px] border-solid border-slate-200 font-grot pl-6 w-64 px-2 py-1 focus:outline-slate-300' placeholder='Search' onKeyDown={handleKeyPress} />
          </div>
          <ul className='flex font-playFair space-x-8 text-lg font-medium'>
            <li>Blog</li>
            <li>Create</li>
            <li>About</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar