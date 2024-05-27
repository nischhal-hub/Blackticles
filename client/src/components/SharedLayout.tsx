import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import React from 'react'

const SharedLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default SharedLayout