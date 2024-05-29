import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import React from 'react'
import {motion} from 'framer-motion'
const SharedLayout = () => {
    return (
        <>
        
        <div className="overflow-hidden">
            <Navbar />
        <motion.div
        initial={{opacity:0}}
        animate={{ opacity: 1 }}
        transition={{duration:.5}} >
            <Outlet />
            </motion.div>
            <Footer />
        </div>
        </>
    )
}

export default SharedLayout