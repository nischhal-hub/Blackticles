import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { MdDeleteForever } from 'react-icons/md'


const Toaster = () => {
    const {isDeleted,setIsDeleted} = useGlobalContext()
    useEffect(() => {
        const timer = setTimeout(() => (
            setIsDeleted(false)
        ), 2000)
        return () => clearTimeout(timer)
    }, [isDeleted])
    return (
        <>
            {/* toaster */}
            <motion.div
                initial={{ x: '100%' }}
                animate={isDeleted ? { x: 0 } : { x: '100%' }}
                exit={{ x: '100%' }}
                transition={{ duration: .3 }}
            >
                <div className='px-2 py-4 bg-slate-200 w-fit border-red-600 border-[1px] font-grot absolute right-0'>
                    <p className='flex items-center'><MdDeleteForever className='mr-2 text-xl text-red-600 font-bold' />Item deleted successfully.</p>
                </div>
            </motion.div>
        </>
    )
}

export default Toaster