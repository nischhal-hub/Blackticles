import React from 'react'
import arrow from '../assets/arrow.svg'
import { motion } from 'framer-motion'
const Error = () => {
    return (
        <motion.div
             initial={{opacity:0}}
             animate={{opacity:1}}
             exit={{opacity:0}}
             transition={{duration:.2}}
        >
        <div className='min-h-screen flex justify-center items-center pb-24'>
            <div className='w-[90%] md:w-[60%] mx-auto'>
                <div className='flex items-center justify-center'>
                    <img src={arrow} alt="arrow" className='w-16 mr-2' />
                    <h1 className='text-6xl font-extrabold font-grot'>Error 404</h1>
                </div>
                <p className='text-center font-playFair font-semibold text-3xl ml-6'>Page not found!!</p>
            </div>
        </div></motion.div>
    )
}

export default Error