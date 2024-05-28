import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import React from 'react'

const SharedLayout = () => {
    return (
        <>
        <div className="overflow-hidden">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
        </>
    )
}

export default SharedLayout