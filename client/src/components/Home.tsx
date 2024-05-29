import React from 'react'
import thumbnail from '../assets/image 2.jpg'
import Card from './Card'
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <>
      <motion.div
        initial={{opacity:0}}
        animate={{ opacity: 1 }}
        transition={{duration:.5}} >
        {/* Hero blog */}
        <div className='w-full mt-10 md:w-[60%] mx-auto'>
          <div className=' border-b-2 border-solid border-slate-900 border-spacing-7 pb-8'>
            <div className='w-full' >
              <img src={thumbnail} alt="picture" className='w-full' />
            </div>
            <h1 className='font-playFair text-4xl font-bold text-center mx-4 mt-2'>A few words about this blog platform, Ghost, and how this site was made.</h1>
            <p className='font-grot font-light text-lg text-center mx-6 mt-4'>Why Ghost (& Figma) instead of Medium, WordPress or other options?</p>
          </div>
          {/* all articles */}
          <div className='mt-10 w-full mx-auto'>
            <h3 className='text-center font-playFair text-3xl font-bold'>All articles</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
              {Array.from({ length: 5 }).map((_, i) => (<Card key={i} />))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Home