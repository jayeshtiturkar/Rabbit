import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi2'
import SearchBar from './SearchBar';
import CartDrader from './CartDrawer';
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpener, setNavOpener] = useState(false);
  const { cart } = useSelector((state) => state.cart)
  const { guestID, user } = useSelector((state) => state.auth)
  const totalProducts = cart.products.length
  const togglenavBar = () => {
    setNavOpener(!navOpener)
  }
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <>
      <nav className='container mx-auto flex item-center justify-between py-2 px-6'>
        {/* Left Logo */}
        <div>
          <Link to={"/"} className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* Center Link */}
        <div className='hidden md:flex space-x-6 mt-1'>
          <Link to="/collections/all?gender=Men" className='text-gray-700 hover:text-black text-sm uppercase font-bold'>
            Men
          </Link>
          <Link to="/collections/all?gender=Women" className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
            Woman
          </Link>
          <Link to="/collections/all?category=Top+Wear" className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
            Top Wear
          </Link>
          <Link to="/collections/all?category=Bottom+Wear" className='text-gray-700 hover:text-black text-sm font-bold uppercase'>
            Bottom Wear
          </Link>
        </div>
        {/* Right Logo */}
        <div className='flex items-center space-x-4'>
          {
            user && user.role === "admin" && (
            <Link to={"/admin"} className='bg-black text-sm text-white px-2 rounded-md'>admin</Link>
          )}

          {
            user ?
              <Link to={"/profile"} className='hover:text-black'>
                <FaUserCircle className='h-7 w-7 text-gray-700' />
              </Link>
              :
              <Link to={"/login"} className='hover:text-black'>
                <button
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-400 hover:from-blue-700 hover:to-orange-500 text-sm text-white font-semibold px-3 py-1 rounded-xl shadow-md transition duration-300"
                > Login
                </button>
              </Link>
          }

          <button className='relative hover:text-black ' onClick={toggleCartDrawer}>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
            <span className=' absolute -top-1 bg-rabbit-red text-white text-sm rounded-full px-2 py-0.5'>{totalProducts}</span>
          </button>
          {/*Search Bar */}
          <div className='overflow-hidden'>
            <SearchBar />
          </div>

          <button className='md:hidden' onClick={togglenavBar}>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>

      {/* SideBar */}
      <CartDrader drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation  */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
      ${navOpener ? "translate-x-0" : "-translate-x-full"}
        `}>
        <div className="flex justify-end p-4">
          <button onClick={togglenavBar}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="ml-3 ">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link to="/collections/all?gender=Men" onClick={togglenavBar} className="block text-gray-600 hover:text-pink">Men</Link>

            <Link to="/collections/all?gender=Women" onClick={togglenavBar} className="block text-gray-600 hover:text-pink">Women</Link>

            <Link to="/collections/all?category=Top Wear" onClick={togglenavBar} className="block text-gray-600 hover:text-pink">Top Wear</Link>

            <Link to="/collections/all?category=Bottom Wear" onClick={togglenavBar} className="block text-gray-600 hover:text-pink">Buttom Wear</Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar