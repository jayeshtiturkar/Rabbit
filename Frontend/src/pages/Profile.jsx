import React, { useState } from 'react'
import MyOrders from '../componants/Product/MyOrders';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const Profile = () => {
  const { guestID, user } = useSelector((state) => state.auth)
  const [email, setemail] = useState(user?.email || "tony@marval.com");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handlelogout = () =>{
    dispatch(logout())
    navigate("/")
    dispatch(clearCart())
  }
  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-6 justify-center gap-2 my-4'>
        {/* Left Side */}
        <div className='space-y-4 mx-10 md:mx-16 p-6 md:p-12 md:col-span-2 border shadow-sm max-h-min'>
          <h2 className='text-2xl font-extrabold'>{user?.name}</h2>
          <p className='text-lg'>{email}</p>
       
            <button className='bg-red-500 text-white w-full py-2 rounded-md' onClick={handlelogout}>
              Logout
            </button>
        </div>

        {/* Right Side */}
        <div className='md:col-span-4 m-2'>
        <MyOrders />
        </div>
      </div>
    </div>
  )
}

export default Profile