import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowCircleUp } from 'react-icons/fa';

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
