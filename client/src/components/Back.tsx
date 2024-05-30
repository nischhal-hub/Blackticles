import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

type TProp = {
    url:string;
}
const Back = (prop:TProp) => {
  return (
    <div className='w-fit'><Link to={prop.url} className='flex items-center font-grot mt-2 text-lg font-bold py-1 pl-2 pr-4  bg-accent'><IoIosArrowBack/> Back</Link></div>
  )
}

export default Back