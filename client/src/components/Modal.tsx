import { motion } from 'framer-motion';
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { useGlobalContext } from '../hooks/useGlobalContext';
import { MdDeleteForever } from 'react-icons/md';
type TModalProp = {
    show: boolean;
    onCloseButtonClick: () => void;
}
const Modal: FC<TModalProp> = (prop) => {
    const {toasterStat,setToasterStat} = useGlobalContext()
    const variants = {
        open: { height: '100%', opacity: 1 },
        close: { height: 0, opacity: 0 }
    }
    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={prop.show ? 'open' : 'close'}
            variants={variants}
            exit={{ height: 0 }}
            transition={{ duration: .2 }}
            className="bg-whiteTransparent w-full h-screen fixed top-0 right-0 flex justify-center items-center z-50">
            <div className="relative w-[80%] sm:w-[40%] px-2 h-44 bg-red-600 border-[1px] border-solid border-black flex flex-col justify-center items-center">
                <div className="absolute top-1 right-3">
                    <button onClick={prop.onCloseButtonClick} className='text-4xl text-white'>&times;</button>
                </div>
                <div className="font-grot text-xl text-center text-white mt-4">
                    Are you sure you want to delete this blog?
                </div>
                <div className='space-x-8 mt-4'>
                    <button onClick={()=>{prop.onCloseButtonClick(); setToasterStat({show:true,type:'red-600',msg:'Item deleted successfully!',icon:<MdDeleteForever/>})}} className='px-2 py-1 bg-white text-red-600 font-grot text-sm'>Shwoosh!!</button>
                    <button onClick={prop.onCloseButtonClick} className='px-2 py-1 bg-accent font-grot text-sm'>No</button>
                </div>
            </div>
        </motion.div>
        , document.body
    )
}

export default Modal