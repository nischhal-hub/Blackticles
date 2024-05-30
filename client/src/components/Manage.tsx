import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import { motion } from 'framer-motion'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa6'

const Manage = () => {
    const [showOverlay, setShowOverlay] = useState({ index: 0, show: false });
    const variants = {
        hide: { opacity: 0, y: "20%" },
        show: { opacity: 1, y: 0 }
    }
    return (
        <>
            <div className='min-h-screen'>
                <div className='w-[90%] md:w-[60%] mx-auto'>
                    <h3 className='text-center font-playFair text-3xl font-bold mt-6'>Manage articles</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className='relative' onClick={() => (setShowOverlay((prev) => ({ index: i, show: !prev.show })))}>
                                {showOverlay.show === true && showOverlay.index === i &&
                                    <motion.div
                                        initial="hide"
                                        animate="show"
                                        variants={variants}
                                        className='w-[90%] m-auto bg-whiteTransparent z-30 absolute bottom-0 left-0 top-0 right-0 flex items-end'>
                                        <div className='w-full m-4 z-50'>
                                            <div className='flex justify-between space-x-2 mb-2'>
                                                <button className='px-2 py-1 bg-accent font-grot text-md w-1/2 font-bold'><Link to='/edit'><span className='flex items-center justify-center'><CiEdit className='text-lg mr-1'/>Edit</span></Link></button>
                                                <button className='px-2 py-1 bg-red-600 font-grot text-md text-white w-1/2 font-bold'><span className='flex items-center justify-center'><MdDeleteOutline className='text-lg mr-1'/>Delete</span></button>
                                            </div>
                                            <button className='px-2 py-1 bg-black text-white font-grot text-md w-full font-bold'><Link to='/blog'><span className='flex items-center justify-center'><FaRegEye className='text-lg mr-1'/>View</span></Link></button>
                                        </div>

                                    </motion.div>}
                                <Card showTransition={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manage