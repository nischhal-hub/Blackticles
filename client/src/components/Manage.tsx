import React, { useState, useEffect } from 'react'
import { cn } from '../utils/cn'
import { Link } from 'react-router-dom'
import Card from './Card'
import { motion } from 'framer-motion'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa6'
import useModal from '../hooks/useModal'
import Modal from './Modal'
import { useGlobalContext } from '../hooks/useGlobalContext'
import Toaster from './Toaster'
import { useQuery } from '@tanstack/react-query'
import { fetchAll } from '../api'
import { TBlogContent } from '../type'

type TshowOverlay = {
    index: number | null;
    show: boolean;
}

const Manage = () => {
    const {data, isLoading} = useQuery({
        queryFn: ()=>fetchAll(),
        queryKey: ['blogs']
      })
      console.log(data)
    const { setDeleteId } = useGlobalContext()
    const [isShowing, toggle] = useModal()
    const [showOverlay, setShowOverlay] = useState<TshowOverlay>({ index: 0, show: false });
    const variants = {
        hide: { opacity: 0, height: "0%", zIndex: '-100' },
        show: { opacity: 1, height: 'auto', zIndex: '200' }
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .2 }}
            >
                <Toaster />
                <div className='min-h-screen'>
                    <div className='w-[90%] md:w-[60%] mx-auto'>
                        <h3 className='text-center font-playFair text-3xl font-bold mt-6'>Manage articles</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
                            <Modal show={isShowing} onCloseButtonClick={toggle} />
                            {data?.blogs?.length >0 ? data?.blogs?.map((item:TBlogContent, i:number) => (
                                <div key={i} className='relative' onClick={() => (setShowOverlay((prev) => {
                                    if (prev.index === i && prev.show === true)
                                        return { index: prev.index, show: false }
                                    else
                                        return { index: i, show: true }
                                }))}>

                                    <motion.div
                                        initial="hide"
                                        animate={showOverlay.show && showOverlay.index === i ? "show" : "hide"}
                                        variants={variants}
                                        transition={{ duration: .3 }}
                                        className={cn(
                                            'w-[90%] m-auto z-10',
                                            showOverlay.index === i && 'bg-whiteTransparent',
                                            'absolute bottom-0 left-0 top-0 right-0 flex items-end'
                                        )}>

                                        <div className='w-full m-4 z-50 '>
                                            <div className='flex justify-between space-x-2 mb-2'>
                                                <button className='px-2 py-1 bg-accent font-grot text-md w-1/2 font-bold'><Link to={`/edit/${item?.slug}`}><span className='flex items-center justify-center'><CiEdit className='text-lg mr-1' />Edit</span></Link></button>
                                                <button onClick={()=>{setDeleteId(item._id); toggle()}} className='px-2 py-1 bg-red-600 font-grot text-md text-white w-1/2 font-bold'><span className='flex items-center justify-center'><MdDeleteOutline className='text-lg mr-1' />Delete</span></button>
                                            </div>
                                            <button className='px-2 py-1 bg-black text-white font-grot text-md w-full font-bold'><Link to={`/blog/${item?.slug}`}><span className='flex items-center justify-center'><FaRegEye className='text-lg mr-1' />View</span></Link></button>
                                        </div>

                                    </motion.div>
                                    <Card showTransition={false} content={item}/>
                                </div>
                            )):(<div className='w-[95%] md:w-[60%]'>
                                <p className='text-center text-xl font-grot mt-10 font-bold'>No blogs to show.🥺</p>
                                <p className='text-center font-grot'>Don't worry create some Awesometicles here👉 <span className='text-3xl'><Link to='/create'>😎</Link></span> 👈</p>
                            </div>)}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Manage