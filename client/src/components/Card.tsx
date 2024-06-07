import { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn';
import { TBlogContent } from '../type';

type TCardProp = {
    showTransition :boolean;
    content: TBlogContent
}
const Card = ({showTransition, content}: TCardProp) => {
    const [showEllipses, setShowEllipses] = useState(false);
    const paraRef = useRef<HTMLDivElement>(null)
    const date = new Date(content?.updatedAt || new Date()).toISOString().split('T')[0];
    useEffect(() => {
        if (paraRef.current) {
            const { scrollHeight, clientHeight } = paraRef.current
            if (scrollHeight > clientHeight) {
                setShowEllipses(true);
            }
        }
    }, [])
    return (
        <>
            <div className={cn(
                'w-[90%]',
                'mx-auto',
                'mt-6',
                'hover:shadow-lg',
                !showTransition ? '' : 'hover:-translate-y-1 transition-transform'
            )}>
                <div className='w-full h-52 overflow-hidden bg-slate-200'>
                    <img src={`http://localhost:5002/${content?.image}`} alt="blog picutre" className='w-full h-full object-contain' />
                </div>
                <div className='h-20 overflow-hidden mb-2 relative' ref={paraRef}>
                    {showEllipses && <p className='absolute -bottom-1 right-1 font text-2xl'>....</p>}
                    <p className='text-center mx-6 font-grot text-lg font-normal' >{content?.title}</p>
                </div>
                <div className='border-t-[0.3px] border-slate-700 flex justify-between mx-2 font-light text-xs font-sourceSerif py-2'>
                    <p>@Blacktech</p>
                    <p>{date}</p>
                </div>
            </div>
        </>
    )
}

export default Card