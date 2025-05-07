import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCheckout } from '../../redux/slices/checkoutSlice';
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

const OrderConfirmation = () => {
    const dispatch = useDispatch()
    const calculatedEstimatedDelivary = (createdAt) => {
        const orderdate = new Date(createdAt);
        orderdate.setDate(orderdate.getDate() + 10);
        return orderdate.toLocaleDateString()
    }
    const { checkout } = useSelector((state) => state.checkout)
    useEffect(() => {
        const checkout = JSON.parse(localStorage.getItem("checkoutSession"))
        if (checkout) {
            dispatch(setCheckout(checkout));
        }
    }, []);
    const handlemyorders = async () => {
        dispatch(setCheckout(null));
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/finalize/${checkout._id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            }
        })
        console.log(response.data)
    }
    if (!checkout) return <p>Loading checkout details...</p>;
    return (
        <div className='grid justify-center itmes-center m-5 p-4 flex-col'>
            <h1 className='text-2xl md:text-4xl text-emerald-700 font-semibold text-center mb-2'>Thank You For Your Order !</h1>
            <Link to={"/my-orders"} onClick={handlemyorders} className='pl-4 justify-self-start text-lg text-blue-600 text-center flex items-center justify-center mt-2'><FaArrowCircleLeft className='mr-1' />
                My Orders</Link>
            <div className='border border-gray-300 m-4 p-4 rounded-md'>
                <div className='flex justify-center mb-10 gap-x-4 md:gap-x-56'>
                    <div className=''>
                        <h2 className='font-semibold'>Order ID: {checkout._id}</h2>
                        <p className='font-sm text-gray-700'>Order date : {new Date(checkout.createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* Estimated Delivary */}
                    <p className='text-xs text-emerald-700 font-semibold'>Estimated Delivary: {calculatedEstimatedDelivary(checkout.createdAt)}</p>
                </div>


                {
                    checkout.checkoutItmes &&
                    checkout.checkoutItmes.map((item,) => (
                        <div key={item._id} className='flex justify-between'>
                            <div className='flex m-2'>
                                <img src={item.image} alt={item.name} className='h-12 w-10 object-cover rounded-md' />
                                <div className='mx-2'>
                                    <p className='font-semibold text-sm'>{item.name}</p>
                                    <p className='text-xs mt-1'>{item.color} | {item.size}</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold text-sm'>${item.price}</p>
                                <p className='text-xs mt-1'>Qty: {item.quantity}</p>
                            </div>
                        </div>
                    ))
                }

                <div className='grid grid-cols-3 m-2 mt-6'>
                    <div>
                        <p className=' font-semibold mb-2'>Payment</p>
                        <p className='text-sm'>Cash on Delivery</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-semibold mb-2'>Delivery</p>
                        <div className=''>
                            <p className='text-sm'>{checkout.shippingAddress.address}</p>
                            <p className='text-sm'>{checkout.shippingAddress.city} , {checkout.shippingAddress.country}</p>
                        </div>
                    </div>
                    <div className='justify-self-end'>
                        <p className=' font-semibold mb-2 '>Total Price :</p>
                        <p className='text-sm'>$ {Math.ceil(checkout.totalPrice)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation