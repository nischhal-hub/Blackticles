import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import { motion } from 'framer-motion'
const Manage = () => {
    const variants ={
        show:{opacity:1 , y:0 }
    }
    return (
        <>
            <div className='min-h-screen'>
                <div className='w-[90%] md:w-[60%] mx-auto'>
                    <h3 className='text-center font-playFair text-3xl font-bold mt-6'>Manage articles</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
                        {Array.from({ length: 5 }).map((_, i) => (<Link key={i} to='/blog' >
                            <div className='border-2 border-black relative overflow-hidden'>
                                <div className='w-[90%] m-auto hover:bg-fuchsia-500 hover:bottom-0 z-60 absolute -bottom-10 right-0 border-2 border-black '>
                                </div>
                                <Card />
                            </div>
                        </Link>))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Manage