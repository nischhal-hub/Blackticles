import React from 'react'
import thumbnail from '../assets/Rectangle 12.png'

const Card = () => {
    return (
        <>
            <div className='w-[90%] mx-auto mt-6' >
                <div className='w-full h-52 border-2 overflow-hidden'>
                    <img src={thumbnail} alt="blog picutre" className='w-full h-full object-cover' />
                </div>
                <p className='text-center mx-6 font-grot text-lg font-normal'>Granny gives everyone the finger, and other tips from OFFF Barcelona.</p>
                <div className='border-t-[0.3px] border-slate-700 flex justify-between mx-2 font-light text-xs font-sourceSerif py-2'>
                    <p>@Blacktech</p>
                    <p>2024/05/29</p>
                </div>
            </div>
        </>
    )
}

export default Card