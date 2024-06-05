import React, { useEffect, useState } from 'react'
import arrow from '../assets/arrow.svg'
import arrow2 from '../assets/Black Green Futuristic Technology Company Logo (2).png'
import { BiSolidImageAdd } from 'react-icons/bi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaCloudUploadAlt } from "react-icons/fa";
import Back from './Back'
import Editor from './Editor'
import { motion } from 'framer-motion'
import Loading from './Loading'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editBlog, fetchSingle } from '../api'
import { useParams } from 'react-router-dom'
import Toaster from './Toaster'
import { TiTick } from 'react-icons/ti'


type TFormFields = {
    title: string;
    overview: string;
    image: File;
    description: string;
}
type TEditData = {
    formData: FormData;
    editId: string;
}

const Editblog = () => {
    const { query } = useParams()
    const { description } = useGlobalContext()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TFormFields>()
    const queryClient = useQueryClient()
    const { setToasterStat } = useGlobalContext()
    const [image, setImage] = useState<string>("")
    const [editId, setEditId] = useState('');
    const { data, isLoading, isFetching } = useQuery({
        queryFn: () => fetchSingle(query),
        queryKey: ['blogs']
    })

    useEffect(() => {
        if (data) {
            setValue("title", data?.blog?.title)
            setImage(`http://localhost:5002/${data?.blog?.image}`)
            setValue("overview", data?.blog?.overview)
            setEditId(data?.blog?._id)
        }
    }, [data])
    const { mutate, isPending } = useMutation(
        {
            mutationFn: ({ formData, editId }: TEditData) => editBlog(formData, editId)
        }
    )

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append("title", data.title)
        formData.append("overview", data.overview)
        formData.append("description", description)
        formData.append("image", data.image[0])
        mutate({ formData, editId }, {
            onSuccess: () => {
                setValue("title", "")
                setImage("")
                setValue("overview", "")
                setToasterStat({ show: true, type: "accent", msg: "Blog edited succesfully.", icon: <TiTick /> })
                queryClient.invalidateQueries({
                    queryKey: ['blogs']
                })
            },
            onError: () => {
                setToasterStat({ show: true, type: "red-600", msg: "Blog couldn't be edited. Try again", icon: <TiTick /> })
            }

        })
    }
    const handleChange = (e: any) => {
        const imageURL = e.target?.files[0]
        if (imageURL) {
            setImage(URL.createObjectURL(imageURL))
        }
    }
    // if (isLoading) {
    //     return <Loading />
    // }
    // if (isPending) {
    //     return <Loading />
    // }
    if (isFetching){
        return <Loading />
    } else {
        {
            return (
                <>
                    <div className='min-h-screen relative'>
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
                        <Toaster />
                        <div className='w-[95%] md:w-[40%] mx-auto mt-6 relative'>
                            <Back url={'/'} />
                            <div className="form w-full mt-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div >
    
                                        <p className='text-textLight text-2xl font-semibold font-playFair'>Blog title.</p>
                                        <div className='flex flex-col mt-4'>
                                            <div className='flex flex-col w-full'>
                                                <p className='font-grot font-normal text-sm'>Title</p>
                                                <input type="text" {...register('title', {
                                                    required: "Enter the title.",
    
                                                }
                                                )} className='bg-slate-100 border-2 border-solid border-borderColor px-4 py-2 text-textSecondary-200 rounded-lg font-grot font-medium text-sm required:border-accent required:border-[1px]' placeholder='Eg. The rockerzz' />
                                                {errors.title && <span className='text-sm text-error font-sourceSerif mt-2'>{errors.title.message}</span>}
                                            </div>
                                            <div className='flex flex-col mt-3 w-full'>
                                                <p className='font-grot font-normal text-sm text-textSecondary-100 my-1'>Overview</p>
                                                <input type="text" {...register('overview', {
                                                    required: "Enter the overview."
                                                }
                                                )} className='bg-slate-100 border-2 border-solid border-borderColor px-4 py-2 text-textSecondary-200 rounded-lg font-grot font-medium text-sm' placeholder='Short description for your blog.' />
                                                {errors.overview && (<span className='text-sm text-error font-grot mt-2'>{errors.overview.message}</span>)}
    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="upload mt-6 focus:snap-none">
                                        <p className='text-textLight text-2xl font-semibold font-playFair'>Upload your file</p>
                                        <p className='font-grot font-normal text-xs text-textLight mt-3'>Upload thumbnail.</p>
                                        <p className='font-grot font-normal text-xs text-textLight'>PNG,GIF,WEBP Max=30MB.</p>
                                        <div className='w-full lg:w-[60%] relative'>
                                            <BiSolidImageAdd className='absolute top-0 left-0 bottom-0 right-0 m-auto w-full text-2xl text-textSecondary-200' />
    
                                            <label htmlFor="file" className='bg-accent absolute top-4 right-6 font-normal text-xl rounded-[50px] px-2 py-1 cursor-pointer z-20'><FaCloudUploadAlt /></label>
                                            <label htmlFor="file" className='bg-accent absolute top-5 right-7 font-normal text-xs rounded-[50px] px-2 py-1 cursor-pointer animate-ping z-10'><FaCloudUploadAlt /></label>
                                            <div className='w-full  mt-4 bg-slate-100 rounded-md overflow-hidden flex items-center justify-center aspect-video border-[1px] border-slate-300'>
                                                <img src={image} className='object-contain' />
                                                <div className='w-[0.1px] opacity-0 overflow-hidden'>
                                                    <input type="file" id='file' {...register('image', {
                                                        required: "Image file required.",
                                                        onChange: (e) => handleChange(e),
                                                    }
                                                    )} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event details mt-6">
                                        <p className='text-textLight text-2xl font-semibold font-playFair'>Blog content.</p>
    
                                        <div className='flex flex-col w-full'>
                                            <p className='font-grot font-normal text-sm text-textSecondary-100 my-1'>Description</p>
                                            {/* <input type="text" {...register('description', {
                                        required: "Enter the description.",
    
                                    }
                                    )} className='bg-slate-100 border-2 border-solid border-borderColor px-4 py-2 text-textSecondary-200 rounded-lg font-grot font-medium text-sm required:border-accent required:border-[1px]' placeholder='Eg. The rockerzz' /> */}
                                            <Editor blockdata={data?.blog?.description} />
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
    
                                        <button className='px-6 py-2 bg-accent rounded-3xl font-grot mt-6 font-bold text-lg' >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Editblog