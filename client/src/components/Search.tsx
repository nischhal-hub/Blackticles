import React, { ChangeEvent, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useParams } from 'react-router-dom'
import Card from './Card'

const Search = () => {
    const { query } = useParams()
    const [inputTerm, setInputTerm] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTerm(e.target.value);
    }


    return (
        <>
            <div className='min-h-screen'>
                <div className='md:hidden relative sm:ml-6 w-[90%] mt-6 mx-auto'>
                    <CiSearch className='absolute text-slate-500 top-3 left-1' />
                    <div className='flex'>
                        <input type="text" value={inputTerm} onChange={handleChange} className='bg-slate-100 border-[1px] border-solid border-slate-200 font-grot pl-6 px-2 py-2 focus:outline-slate-300 w-full' placeholder='Search' />
                        <button className='px-2 py-1 bg-accent font-grot text-sm'>Shwoosh!!</button>
                    </div>

                </div>
                <div className='mt-4 w-[90%] md:w-[60%] mx-auto'>
                    <p className='font-grot text-lg'>Search Result:</p>
                </div>
                <div className='md:w-[60%] mx-auto grid grid-cols-1 md:grid-cols-2'>
                        {Array.from({ length: 3 }).map((_, i) => (<Card key={i} />))}
                    </div>
            </div>
        </>
    )
}

export default Search