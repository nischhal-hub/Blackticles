import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'



const Toaster = () => {
    const {toasterStat,setToasterStat} = useGlobalContext()
    useEffect(() => {
        const timer = setTimeout(() => (
            setToasterStat(
                {show:false,type:"",msg:"",icon:null}
            )
        ), 2000)
        return () => clearTimeout(timer)
    }, [toasterStat])
    return (
        <>
            <motion.div
                initial={{ x: '100%' }}
                animate={toasterStat.show ? { x: 0 } : { x: '100%' }}
                exit={{ x: '100%' }}
                transition={{ duration: .3 }}
            >
                <div className='px-2 py-4 bg-slate-200 w-fit border-red-600 border-[1px] font-grot absolute right-0'>
                    <p className='flex items-center'><span className={`mr-2 text-xl text-${toasterStat.type} font-bold`}>{toasterStat.icon}</span>{toasterStat.msg}</p>
                </div>
            </motion.div>
        </>
    )
}

export default Toaster