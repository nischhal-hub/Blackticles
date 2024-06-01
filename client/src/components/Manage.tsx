import React, { useState } from 'react'
import { cn } from '../utils/cn'
import { Link } from 'react-router-dom'
import Card from './Card'
import { motion } from 'framer-motion'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa6'
import useModal from '../hooks/useModal'
import Modal from './Modal'

const Manage = () => {
    const [isShowing, toggle] = useModal()
    const [showOverlay, setShowOverlay] = useState({ index: 0, show: false });
    const variants = {
        hide: { opacity: 0, y: '5%' },
        show: { opacity: 1, y: 0 }
    }
    return (
        <>
            <div className='min-h-screen'>
                <div className='w-[90%] md:w-[60%] mx-auto'>
                    <Modal show={isShowing} onCloseButtonClick={toggle}/>
                    <h3 className='text-center font-playFair text-3xl font-bold mt-6'>Manage articles</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className='relative' onClick={() => (setShowOverlay((prev) => ({ index: i, show: !prev.show })))}>
                                
                                    <motion.div
                                        initial="hide"
                                        animate={showOverlay.show?"show":"hide"}
                                        variants={variants}
                                        className={cn(
                                            'w-[90%] m-auto z-30',showOverlay.index ===i && 'bg-whiteTransparent', 'absolute bottom-0 left-0 top-0 right-0 flex items-end'
                                        )}>
                                        {showOverlay.show === true && showOverlay.index === i &&
                                        <div className='w-full m-4 z-50 '>
                                            <div className='flex justify-between space-x-2 mb-2'>
                                                <button className='px-2 py-1 bg-accent font-grot text-md w-1/2 font-bold'><Link to='/edit'><span className='flex items-center justify-center'><CiEdit className='text-lg mr-1'/>Edit</span></Link></button>
                                                <button onClick={toggle} className='px-2 py-1 bg-red-600 font-grot text-md text-white w-1/2 font-bold'><span className='flex items-center justify-center'><MdDeleteOutline className='text-lg mr-1'/>Delete</span></button>
                                            </div>
                                            <button className='px-2 py-1 bg-black text-white font-grot text-md w-full font-bold'><Link to='/blog'><span className='flex items-center justify-center'><FaRegEye className='text-lg mr-1'/>View</span></Link></button>
                                        </div>}

                                    </motion.div>
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