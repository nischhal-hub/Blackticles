import arrow from '../assets/arrow.svg'

const Loading = () => {
    return (
        <div className='w-full mt-10 md:w-[60%] mx-auto min-h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-24 mt-32'>
                    <img src={arrow} alt="arrow picture" className='animate-spin' />
                </div>
                <p className='text-2xl font-grot font-bold mt-4'>Loading</p>
            </div>
        </div>
    )
}

export default Loading