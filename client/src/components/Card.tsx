import React, { useEffect, useRef } from 'react'
import thumbnail from '../assets/Rectangle 12.png'
import { cn } from '../utils/cn';


type TProp = {
    showTransition:boolean;
}
const Card = (prop:TProp) => {
    const paraRef = useRef<HTMLParagraphElement>(null)
    useEffect(()=>{
        
        console.log(paraRef.current)
    },[])
    return (
        <>
            <div className={cn(
                    'w-[90%]', 
                    'mx-auto', 
                    'mt-6', 
                    'hover:shadow-lg', 
                    !prop.showTransition?'':'hover:-translate-y-1 transition-transform'
            )} >
                <div className='w-full h-52 overflow-hidden'>
                    <img src={thumbnail} alt="blog picutre" className='w-full h-full object-cover' />
                </div>
                <p className='text-center mx-6 font-grot text-lg font-normal h-20 overflow-hidden mb-2' ref={paraRef}>Granny gives everyone the finger, and other tips from OFFF Barcelona. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, deserunt?</p>
                <div className='border-t-[0.3px] border-slate-700 flex justify-between mx-2 font-light text-xs font-sourceSerif py-2'>
                    <p>@Blacktech</p>
                    <p>2024/05/29</p>
                </div>
            </div>
        </>
    )
}

export default Card