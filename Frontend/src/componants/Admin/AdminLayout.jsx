import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const toggalNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen)
    }
    return (
        <div className='min-h-screen flex flex-col md:flex-row relative'>

            {/* Mobile Toggal Button */}
            <div className='flex md:hidden p-3 bg-gray-900 text-white z-20'>
                <button onClick={toggalNavbar}>
                    <FaBars size={24} />
                </button>
                <h1 className='ml-4 text-xl font-medium'>Admin Dashbord</h1>
            </div>

            {/* OverLayed Are ==> When Our Navbar Open that background */}
            {
                isNavbarOpen &&
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden" onClick={toggalNavbar}></div>
            }

            {/* SideBar For Both Devices */}
            <div className={`bg-gray-900 text-white w-64 min-h-screen absolute md:relative transform
            ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300
            md:translate-x-0 md:static md:block z-20
            `}>

                {/* SideBar */}
                <AdminSidebar />
            </div>

                {/* Main Content */}
            <div className='flex-grow overflow-auto p-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout