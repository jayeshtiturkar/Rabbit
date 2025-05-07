import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { featchAllOrders } from '../../redux/slices/AdminOrderSlice';

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const { orders , totalOrders , totalSales} = useSelector((state) => state.adminOrder)
    const { products, error, loading } = useSelector((state) => state.adminProduct)
    console.log(orders)

    useEffect(() => {
        dispatch(featchAllOrders())
    }, [dispatch]);

    // if (!orders) return <p>Orders Loading...</p>
    return (
        <div className='md:m-4 md:px-4'>
            <h1 className='text-2xl font-semibold ml-4'>Admin Dashboard</h1>

            {/* Revenue and Total Order */}
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='m-4 p-2 border rounded-lg border-gray-200 shadow-lg'>
                    <h3 className='font-semibold'>Revenue</h3>
                    <p className='text-xl'>${totalSales.toFixed(2)}</p>
                </div>
                <div className='m-4 p-2 border rounded-lg border-gray-200 shadow-lg'>
                    <h3 className='font-semibold'>Total Orders</h3>
                    <p className='text-xl mb-1'>{totalOrders}</p>
                    <p className='text-blue-500 text-sm'><Link to={"orders"}>Manage Orders</Link></p>
                </div>
                <div className='m-4 p-2 border rounded-lg border-gray-200 shadow-lg'>
                    <h3 className='font-semibold'>Total Products</h3>
                    <p className='text-xl mb-1'>{products.length}</p>
                    <p className='text-blue-500 text-sm'><Link to={"products"}>Manage Products</Link></p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className='ml-4'>
                <h1 className='text-xl font-semibold'>Recent Orders</h1>
                <div className='overflow-x-auto'>
                    <table className='w-full rounded-lg overflow-hidden my-4'>
                        <thead className=''>
                            <tr className='bg-gray-200 text-sm'>
                                <td className='py-1 px-2 font-semibold'>Order ID</td>
                                <td className='py-1 px-2 font-semibold'>User</td>
                                <td className='py-1 px-2 font-semibold'>Total Price</td>
                                <td className='py-1 px-2 font-semibold'>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders &&
                                orders.map((order, index) => (
                                    <tr key={index} className='border-b mb-2'>
                                        <td className='py-2 px-2 font-semibold text-sm '>{order._id}</td>
                                        <td className='py-1 px-2 text-sm'>{order.user?.name ? order.user?.name :"User Deleted"}</td>
                                        <td className='py-1 px-2 text-sm'>${order.totalPrice}</td>
                                        <td className='py-1 px-2 text-sm'>{order.isDelivered ? "Delivered" : "Processing"}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage