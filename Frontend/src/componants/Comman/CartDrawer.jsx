import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContent from '../Cart/CartContent'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate()
    const { guestID, user } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)
    console.log(cart)
    const handleCheckout = () => {
        if (cart.products.length > 0) {
            if (user) {
                navigate("/checkout")
            } else {
                navigate("/login?redirect=/checkout")
            }
        }
        if (drawerOpen) {
            toggleCartDrawer()
        }
    }
    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            {/* Close Button */}
            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className='h-6 w-6 text-gray-600' />
                </button>
            </div>
            {/* Cart Content With ScrollAble Area */}
            <div className="flex-grow p-4 overflow-y-auto">
                <h2 className='text-xl font-semibold mb-4'> Your Cart </h2>
                <CartContent toggleCartDrawer={toggleCartDrawer} />
            </div>

            {/* Checkout Button Fixed at the Buttom */}
            <div className='p-4 bg-white sticky buttom-0'>

                <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
                    Checkout
                </button>
                <p className='text-sm text-center tracking-tighter text-gray-500 mt-2'>Shipping, Taxes , Discount Code Calculated at Chechout</p>
            </div>
        </div>
    )
}

export default CartDrawer