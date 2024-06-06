import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { GiDuration } from 'react-icons/gi';

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);

    return (
        <motion.div
        initial={{x:'100%',opacity:0}}
        animate={visible?{x:0,opacity:1}:{x:"100%",opacity:0}}
        transition={{duration:.2}}
        className='fixed bottom-20 right-12'>
            {visible && (
                <button  onClick={scrollToTop}>
                    <FaArrowCircleUp className='text-4xl text-accent animate-bounce'/>
                </button>
            )}
        </motion.div>
    );
};

export default ScrollButton;



// import { useState } from 'react';
// import { FaArrowCircleUp } from 'react-icons/fa';

// const ScrollButton = () => {

//     const [visible, setVisible] = useState(false)

//     const toggleVisible = () => {
//         const scrolled = document.documentElement.scrollTop;
//         console.log(scrolled)
//         if (scrolled > 200) {
//             setVisible(true)
//         }
//         else if (scrolled <= 200) {
//             setVisible(false)
//         }
//     };

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };

//     window.addEventListener('scroll', toggleVisible);

//     return (
//         <div>
//             {visible && (
//                 <button className='fixed bottom-20 right-10 ' onClick={scrollToTop}>
//                     <FaArrowCircleUp />
//                 </button>
//             )}
//         </div>

//         // {visible && (<button > 
//         //     <FaArrowCircleUp onClick={scrollToTop} /> 
//         //     </button>)}

//     );
// }

// export default ScrollButton; 
