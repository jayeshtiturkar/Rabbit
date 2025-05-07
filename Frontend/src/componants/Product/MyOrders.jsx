import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { featchUserOrder } from '../../redux/slices/orderSlice';

const listofalert = {
    Delivered: "bg-green-200 text-green-600",
    Shipped: "bg-yellow-200 text-yellow-600",
    Processing: "bg-blue-200 text-blue-600",
    Returned: "bg-orange-200 text-orange-600",
    Cancelled: "bg-red-200 text-red-600"
}

const MyOrders = () => {
    const dispatch = useDispatch()
    const { orders, loading, error } = useSelector((state) => state.order)
    const navigate = useNavigate()
    const haldleRowClick = (orderid) => {
        navigate(`/order/${orderid}`)
    }

    useEffect(() => {
        dispatch(featchUserOrder())
    }, [dispatch]);

    if (!orders) return <div>Loading Orders...</div>
    return (
        <div className='md:block'>
            {
                orders.length > 0 ?
                <>
                    <h2 className='font-bold text-2xl my-4'>My Order</h2>
                    <div className='md:mr-28'>
                        <table className='w-full border shadow-md overflow-hidden rounded-lg'>
                            <thead className='bg-gray-100 text-black font-semibold'>
                                <tr>
                                    <td className='uppercase text-xs p-2 hidden md:block'>image</td>
                                    <td className='uppercase text-xs p-2' >order id</td>
                                    <td className='uppercase text-xs p-2 hidden md:table-cell' >created</td>
                                    <td className='uppercase text-xs p-2 hidden md:table-cell' >shipping address</td>
                                    <td className='uppercase text-xs p-2' >itmes</td>
                                    <td className='uppercase text-xs p-2' >price</td>
                                    <td className='uppercase text-xs p-2' >status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, index) => (
                                        <tr key={index} className='border-b cursor-pointer' onClick={() => haldleRowClick(order._id)}>
                                            <td className='hidden md:block'>
                                                <img src={order.orderItmes[0].image} alt={order.orderItmes[0].image} className='h-14  w-14 rounded-2xl p-2 text-sm' /></td>
                                            <td className='font-bold p-2 text-sm'>#{order._id.slice(0, 8)}.....</td>
                                            <td className='p-2 text-sm hidden md:table-cell'>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className='p-2 text-sm hidden md:table-cell'>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.country},{order.shippingAddress.pincode}</td>
                                            <td className='p-2 text-sm'>{order.orderItmes.length}</td>
                                            <td className='p-2 text-sm'>{Math.floor(order.totalPrice)}</td>
                                            <td><p className={`py-1 mr-2 text-xs ${listofalert[order.status]} text-center font-semibold rounded-md `}>{order.status}</p></td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </> : <h2 className='font-bold text-2xl my-4'>No orders Found</h2>
            }
        </div>
    )
}

export default MyOrders