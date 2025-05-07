import React from 'react'
import Header from '../Comman/Header'
import Footer from '../Comman/Footer'
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
  return (
    <>
    {/* Header */}
    <Header />
    {/* Main Comp */}
    <main>
    <Outlet />
    </main>
    {/* Footer */}
    <Footer />
    </>
  )
}

export default UserLayout