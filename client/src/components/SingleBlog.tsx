//import React from 'react'
import thumbnail from '../assets/image 2.jpg'
import descImg from '../assets/Rectangle 8.png'
import { FaFacebook, FaReddit } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Card from './Card';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSingle } from '../api';
import { EditorJSRenderer } from './EditorJSRenderer';
const SingleBlog = () => {
  const imgURL = 'data:image/jpeg;base64,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'
  const {query} = useParams()
  const {data, isLoading} = useQuery({
    queryFn: ()=>fetchSingle(query),
    queryKey: ['blogs']
  })
  console.log(data)
  return (
    <>
     <motion.div
        initial={{opacity:0}}
        animate={{ opacity: 1 }}
        exit={{opacity:0}}
        transition={{duration:.5}} >
      <div className="min-h-screen mt-10">
        <div className='w-[90%] md:w-[60%] mx-auto'>
          <h1 className="font-playFair text-3xl font-bold text-center mx-4">{data?.blog?.title}</h1>
          <p className='font-grot font-light text-lg text-center mx-6 mt-2'>{data?.blog?.overview}</p>
        </div>
        <div className='w-full mt-6'>
          <img src={`http://localhost:5002/${data?.blog?.image}`} alt="thumbnail" className='w-full' />
        </div>
        <div className='w-[90%] md:w-[60%] mt-6 border-t-2 border-black mx-auto'>

          {/* profile */}
          <div className='md:flex md:justify-between '>
            <div className='flex items-center mt-6'>
              <div className='w-16 h-16 rounded-full overflow-hidden'>
                <img src={imgURL} alt="profile" className='object-cover w-full h-full' />
              </div>
              <div className='ml-4'>
                <p className='font-grot font-bold text-xl'>Black tech.</p>
                <p className='font-grot font-normal '>{new Date(data?.blog?.createdAt || new Date()).toISOString().split('T')[0]}: 5 min read</p>
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
            <EditorJSRenderer data={data?.blog?.description}/>
          {/* for pargraph */}
          {/* <p className='font-playFair text-xl mt-4 tracking-normal md:text-lg'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p> */}
          {/* for heading */}
          {/* <h1 className='font-grot text-2xl font-bold mt-4'>Next on the pipeline</h1>
          <p className='font-playFair text-xl mt-4 tracking-normal md:text-lg'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p> */}

          {/* for images */}
          {/* <div className='w-full mt-4'>
            <img className='w-[150%]' src={descImg} alt="image" />
            <p className='font-sourceSerif font-medium text-center'>Caption: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, adipisci?</p>
          </div>
          <p className='font-playFair text-xl mt-4 tracking-normal md:text-lg'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p>
          <p className='font-playFair text-xl mt-4 tracking-normal md:text-lg'>This lovely web is full of everything which is created I don't know what in mind, considering that sometimes totally bonkers stuff might be highly relevant if it has the right kind of thinking behind it. </p> */}

          {/* UI element */}
          <p className='font-grot text-xl mt-4 font-semibold'>Share:</p>
          <div className='w-full mx-auto'>
            <ul className='flex mt-6 text-3xl justify-around border-[1px] border-solid border-slate-200 py-4'>
              <li className='hover:text-accent transition-colors'><a href="#"><FaFacebook /></a></li>
              <li className='hover:text-accent transition-colors'><a href="#"><FaSquareXTwitter /></a></li>
              <li className='hover:text-accent transition-colors'><a href="#"><FaReddit /></a></li>
            </ul>
          </div>
          {/*  */}

          <div className='flex items-center mt-6'>
            <p className='font-grot text-xl font-semibold'>Tags:</p>
            {Array.from({ length: 3 }).map((_, i) => (<p key={i} className='text-sm px-2 py-1 hover:underline border-[1px] border-solid border-slate-300 rounded-md mx-2 hover:bg-accent cursor-pointer transition-all'>React</p>))}
          </div>

          <div className='flex items-center mt-6 border-t-2 border-slate-400 border-dotted pt-4'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
              <img src={imgURL} alt="profile" className='object-cover w-full h-full' />
            </div>
            <div className='ml-4 w-[90%]'>
              <p className='font-playFair text-xl md:text-lg'><span className='font-bold font-grot'>Black tech. </span> is an aspiring software company that specializes in high-end software development.With a focus on stability and transparency, they empower businesses to thrive in the digital landscape.</p>
            </div>
          </div>
        </div>

        {/* Read more */}
        {/* <div className='w-[95%] md:w-[70%] mt-6 border-t-[1px] border-black mx-auto'>
          <h3 className='text-center font-playFair text-3xl font-bold mt-4'>What to read next</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {Array.from({ length: 5 }).map((_, i) => (<Link to='/blog'><Card showTransition={true} key={i} /></Link>))}
          </div>
        </div> */}
      </div>
      </motion.div>
    </>
  )
}

export default SingleBlog