import React, { useRef, useState } from 'react'
import thumbnail from '../assets/image 2.jpg'
import aniLogo from '../assets/animatedLogo.svg'
import Card from './Card'
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion } from 'framer-motion'
import { cn } from '../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { fetchAll } from '../api';
import { useGlobalContext } from '../hooks/useGlobalContext';
import Loading from './Loading';

type TDates = {
  startDate: Date;
  endDate: Date;
}

interface BlogPost {
  _id: string;
  title: string;
  overview: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Home = () => {
  const {data, isLoading} = useQuery({
    queryFn: ()=>fetchAll(),
    queryKey: ['blogs']
  })
  console.log(data)
  // const {cardLength} = useGlobalContext()
  const { register, handleSubmit, formState: { errors } } = useForm<TDates>()
  const [showFilter, setShowFilter] = useState(false)
  //const [showLoading, setShowLoading] = useState(true)
  const cardHolderRef = useRef<HTMLDivElement>(null)
  const variant = {
    open: {
      opacity:1, height:'auto',y:0
    },
    close: {
      opacity: 0,y:'-200%',height:0
    }
  }
  const onSubmit: SubmitHandler<TDates> = (data) => {
    console.log(data);
  }
  //console.log(cardHolderRef.current?.clientHeight)
  if(isLoading){
    return <Loading />
  }
  return (
    <>
      <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:.2}}
      >

      {/* Hero blog */}
      <div className='w-full mt-10 md:w-[60%] mx-auto'>
        <div className=' border-b-2 border-solid border-slate-900 border-spacing-7 pb-8'>
          <div className='w-full aspect-video' >
            <img src={`http://localhost:5002/${data?.blogs?.[0]?.image}`} alt="picture" className='w-full' />
          </div>
          <h1 className='font-playFair text-4xl font-bold text-center mx-4 mt-2'>{data?.blogs?.[0]?.title}</h1>
          <p className='font-grot font-light text-lg text-center mx-6 mt-4'>{data?.blogs?.[0]?.overview}</p>
        </div>
        {/* all articles */}
        <div className='mt-8 w-full mx-auto'>
          <h3 className='text-center font-playFair text-3xl font-bold'>All articles</h3>
          <div className='mt-4 w-[90%] mx-auto'>
            <div>
              <p onClick={() => (setShowFilter(v => !v))} className='font-grot flex items-center px-2 py-1 border-[1px] border-slate-400 w-fit cursor-pointer'><MdOutlineKeyboardArrowDown className='text-xl mr-2' /> Filter : By date</p>
            </div>
            <motion.div
              initial='close'
              animate={showFilter ? "open" : "close"}
              variants={variant}
              transition={{ duration: .3 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} >
                <div className='w-full mt-2 sm:w-[30%] sm:flex sm:items-center sm:space-x-4'  >
                  <div className='flex flex-col '>
                    <p className='font-grot font-normal text-sm'>From</p>
                    <input type="date" {...register("startDate")} aria-placeholder='DD/MM/YYYY' className='bg-slate-100 border-2 border-solid border-borderColor px-4 py-2 text-textSecondary-200 rounded-lg font-grot font-medium text-sm required:border-accent required:border-[1px]' placeholder='Eg. The rockerzz' />
                    {/* {errors.title && <span className='text-sm text-error font-sourceSerif mt-2'>{errors.title.message}</span>} */}
                  </div>
                  <div className='flex flex-col w-full mt-1 sm:mt-0'>
                    <p className='font-grot font-normal text-sm'>To</p>
                    <input type="date" {...register("endDate")} className='bg-slate-100 border-2 border-solid border-borderColor px-4 py-2 text-textSecondary-200 rounded-lg font-grot font-medium text-sm required:border-accent required:border-[1px]' placeholder='Eg. The rockerzz' />
                    {/* {errors.title && <span className='text-sm text-error font-sourceSerif mt-2'>{errors.title.message}</span>} */}
                  </div>
                </div>
                <button className='px-4 py-1 bg-accent font-grot text-sm mt-4'>Filter</button>
              </form>
            </motion.div>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 overflow-hidden max-h-auto`} ref={cardHolderRef}>
            {data?.blogs?.map((item:BlogPost, i:number) => (<Link key={i} to={`/blog/${item.slug}`} ><Card showTransition={true} content={item}/></Link>))}
          </div>
        </div>
      </div >
      </motion.div>

    </>
  )
}

export default Home