//import React from 'react'
import thumbnail from '../assets/image 2.jpg'
import descImg from '../assets/Rectangle 8.png'
import { FaFacebook, FaReddit } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Card from './Card';
const SingleBlog = () => {
  const imgURL = 'https://i.ytimg.com/vi/Aj8DdoGJ9Fk/hqdefault.jpg'
  return (
    <>
      <div className="min-h-screen mt-10">
        <div className='w-[90%] md:w-[60%] mx-auto'>
          <h1 className="font-playFair text-3xl font-bold text-center mx-4">A few words about this blog platform, Ghost, and how this site was made.</h1>
          <p className='font-sourceSerif font-light text-lg text-center mx-6 mt-2'>Why Ghost (& Figma) instead of Medium, WordPress or other options?</p>
        </div>
        <div className='w-full mt-6'>
          <img src={thumbnail} alt="thumbnail" className='w-full' />
        </div>
        <div className='w-[90%] md:w-[60%] mt-6 border-t-2 border-black mx-auto'>

          {/* profile */}
          <div className='md:flex md:justify-between '>
            <div className='flex items-center mt-6'>
              <div className='w-16 h-16 rounded-full overflow-hidden'>
                <img src={imgURL} alt="profile" className='object-cover w-full h-full' />
              </div>
              <div className='ml-4'>
                <p className='font-sourceSerif font-bold text-xl'>Magne Budha</p>
                <p className='font-sourceSerfit font-normal '>May 28,2024: 5 min read</p>
              </div>
            </div>
            {/* social links */}
            <div className='w-full mx-auto md:w-[50%]'>
              <ul className='flex mt-6 text-3xl justify-around border-[1px] border-solid border-slate-200 py-4'>
                <li ><a href="#"><FaFacebook /></a></li>
                <li ><a href="#"><FaSquareXTwitter /></a></li>
                <li ><a href="#"><FaReddit /></a></li>
              </ul>
            </div>
          </div>

          {/* for pargraph */}
          <p className='font-playFair text-xl mt-4'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p>
          {/* for heading */}
          <h1 className='font-grot text-2xl font-bold mt-4'>Next on the pipeline</h1>
          <p className='font-playFair text-xl mt-4'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p>

          {/* for images */}
          <div className='w-full mt-4'>
            <img className='w-[150%]' src={descImg} alt="image" />
            <p className='font-sourceSerif font-medium text-center'>Caption: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, adipisci?</p>
          </div>
          <p className='font-playFair text-xl mt-4'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p>
          <p className='font-playFair text-xl mt-4'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p>

          {/* UI element */}
          <p className='text-xl mt-4 font-semibold'>Share:</p>
          <div className='w-full mx-auto'>
            <ul className='flex mt-6 text-3xl justify-around border-[1px] border-solid border-slate-200 py-4'>
              <li className='hover:text-accent transition-colors'><a href="#"><FaFacebook /></a></li>
              <li className='hover:text-accent transition-colors'><a href="#"><FaSquareXTwitter /></a></li>
              <li className='hover:text-accent transition-colors'><a href="#"><FaReddit /></a></li>
            </ul>
          </div>
          {/*  */}

          <div className='flex items-center mt-6'>
            <p className='text-xl font-semibold'>Tags:</p>
            {Array.from({ length: 3 }).map((_, i) => (<p key={i} className='text-xl px-2 py-1 hover:underline border-[1px] border-solid border-slate-300 rounded-md mx-2 hover:bg-accent cursor-pointer transition-all'>React</p>))}
          </div>

          <div className='flex items-center mt-6 border-t-2 border-slate-400 border-dotted pt-4'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
              <img src={imgURL} alt="profile" className='object-cover w-full h-full' />
            </div>
            <div className='ml-4 w-[70%]'>
              <p className='font-playFair text-xl'><span className='font-bold font-grot'>Magne Budha </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe enim nemo blanditiis eum cum.</p>
            </div>
          </div>
        </div>

        {/* Read more */}
        <div className='w-[95%] md:w-[70%] mt-6 border-t-[1px] border-black mx-auto'>
          <h3 className='text-center font-playFair text-3xl font-bold mt-4'>What to read next</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {Array.from({ length: 5 }).map((_, i) => (<Card key={i} />))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleBlog