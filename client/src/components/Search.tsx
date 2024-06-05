import React, { ChangeEvent, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link, useParams } from 'react-router-dom'
import Card from './Card'
import Back from './Back'
import { motion } from 'framer-motion'
//import { useQuery } from '@tanstack/react-query'
import { TBlogContent } from '../type';
import { search } from '../api'
import Loading from './Loading'
import axios from 'axios'

const Search = () => {
    const { query } = useParams()
    const [searchQuery, setSearchQuery] = useState<string | undefined>("")
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState<TBlogContent[]>()
    const [inputTerm, setInputTerm] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTerm(e.target.value);
    }
    useEffect(()=>{
        setSearchQuery(query)
    },[query])
    useEffect(() => {
            const fetchSearchResult = async () => {
                setLoading(true);
                try {
                    const resp = await axios(`http://localhost:5002/api/blogs/search?title=${searchQuery}`)
                    setLoading(false)
                    setSearchData(resp.data);
                    console.log(resp.data)
                    return resp.data
                } catch (error) {
                    console.log(`Error Fetching single blog data: ${error}`)
                    throw error
                }
            }
    
        fetchSearchResult();
    }, [searchQuery])

    if (loading) {
        return <Loading />
    }
    console.log(searchData)
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .2 }}
            >
                <div className='min-h-screen'>
                    <div className='w-[90%] md:w-[60%] mx-auto mt-4'>
                        <Back url={'/'} />
                    </div>
                    <div className='md:hidden relative sm:ml-6 w-[90%] mt-4 mx-auto'>
                        <CiSearch className='absolute text-slate-500 top-3 left-1' />
                        <div className='flex'>
                            <input type="text" value={inputTerm} onChange={handleChange} className='bg-slate-100 border-[1px] border-solid border-slate-200 font-grot pl-6 px-2 py-2 focus:outline-slate-300 w-full' placeholder='Search' />
                            <button className='px-2 py-1 bg-accent font-grot text-sm' onClick={()=>(setSearchQuery(inputTerm))}>Shwoosh!!</button>
                        </div>

                    </div>
                    <div className='mt-4 w-[90%] md:w-[60%] mx-auto'>
                        <p className='font-grot text-lg'>Search Result:</p>
                    </div>
                    <div className='md:w-[60%] mx-auto grid grid-cols-1 md:grid-cols-2'>
                       {searchData?.map((item:TBlogContent, i:number) => (<Link key={i} to={`/blog/${item.slug}`} ><Card showTransition={true} content={item}/></Link>))}
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Search