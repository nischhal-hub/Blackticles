import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollButton from "./ScrolltoTop";

const SharedLayout = () => {
    return (
        <>
        
        <div className="overflow-hidden relative">
            <Navbar />
            <ScrollButton/>
            <Outlet />
            <Footer />
        </div>
        </>
    )
}

export default SharedLayout