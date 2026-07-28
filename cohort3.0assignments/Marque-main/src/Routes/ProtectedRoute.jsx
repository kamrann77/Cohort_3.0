import React, { useContext } from 'react'
import { MyStore } from '../Context/MyContext'
import { Navigate, Outlet } from 'react-router'
import Navbar from '../PAGES/HOME/Components/Navbar'
import Footer from '../PAGES/HOME/Components/Footer'
import Cart from '../PAGES/HOME/Components/Cart'

const ProtectedRoute = () => {
    const { profile, cartToggle } = useContext(MyStore)
    return (
        <div
            id="app-scroll-container"
            className='relative h-screen overflow-y-auto bg-white dark:bg-neutral-950'>

            {cartToggle && <Cart />}

            <Navbar />

            <div className='pt-16'>
                {profile ? <Outlet /> : <Navigate to={"/"} />}
            </div>

            <Footer />
        </div>
    )
}

export default ProtectedRoute