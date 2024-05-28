import React from 'react'
import arrow from '../assets/arrow.svg'
import arrow2 from '../assets/Black Green Futuristic Technology Company Logo (2).png'
const Postblog = () => {
    return (
        <>
            <div className='min-h-screen'>
                <div className='w-full md:w-[60%] mx-auto h-20 bg-black text-white flex items-center justify-center relative overflow-hidden'>
                    <img src={arrow} alt="arrow" className='w-12 absolute -top-5 left-0 origin-center rotate-45' />
                    <img src={arrow} alt="arrow" className='w-12 absolute -bottom-3 right-0 origin-center -rotate-45' />
                    <img src={arrow2} alt="arrow" className='w-24 absolute -bottom-12 right-2 origin-center rotate-270' />
                    <img src={arrow2} alt="arrow" className='w-24 absolute -top-16 left-10 origin-center rotate-270' />
                    {/* <h3 className='font-playFair text-3xl font-bold '>Create blog</h3> */}
                    <div className='w-full text-white text-nowrap flex justify-center font-sourceSerif'>
                        <p className='w-[130%] tracking-widest text-xl'>{Array.from({ length: 20 }).map((_, i) => (<span key={i} className='font-light'> Create <span className='font-bold'> Awesometicles </span></span>))}</p>
                    </div>
                </div>
                <div className='w-[95%] md:w-[40%] mx-auto mt-6'>
                    <div className='flex flex-col'>
                        <label htmlFor="title" className='text-xl font-playFair font-bold'>Title</label>
                        <input className='p-2 bg-slate-200 focus:outline-accent focus:outline-[0.5px] font-sourceSerif' type="text" name='title' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Postblog