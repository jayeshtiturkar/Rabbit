import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchAllOrders, updateOrderStatus } from "../../redux/slices/AdminOrderSlice";

const ManageOrders = () => {
    const [orderData, setOrderData] = useState([]);
    const dispatch = useDispatch()
    const { orders, totalOrders, totalSales } = useSelector((state) => state.adminOrder)

    useEffect(() => {
        setOrderData(orders);
    }, [orders]);

    useEffect(() => {
        dispatch(featchAllOrders())
    }, [dispatch]);

    const handleStatusChange = (orderID, valueToUpdate) => {
        setOrderData(prevorder => prevorder.map((order) => (order._id === orderID ? ({ ...order, status: valueToUpdate }) : order)));
        dispatch(updateOrderStatus({id :orderID , status : valueToUpdate}))
    };


    return (
        <div className="m-4 p-4">
            <h1 className="text-2xl font-semibold">Product Management</h1>

            {/* Product Details Table */}
            <div className="">
                <div className="overflow-x-auto">
                    <table className="w-full rounded-lg overflow-hidden my-4 shadow-md">
                        <thead className="">
                            <tr className="bg-gray-200 text-sm">
                                <td className="py-1 px-2 font-semibold">Order ID</td>
                                <td className="py-1 px-2 font-semibold">Customer</td>
                                <td className="py-1 px-2 font-semibold">Total Price</td>
                                <td className="py-1 px-2 font-semibold">Status</td>
                                <td className="py-1 px-2 font-semibold">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData ? (
                                orderData.map((order, index) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2 font-semibold text-sm mb-3">
                                            #{order._id}
                                        </td>
                                        <td className="p-2 text-sm">{order.user?.name ? order.user?.name : "User Deleted"}</td>
                                        <td className="p-2 text-sm">${order.totalPrice}</td>
                                        <td className="py-1 px-2 text-sm">
                                            <select
                                                value={order.status}
                                                name="status"
                                                id=""
                                                onChange={e => handleStatusChange(order._id, e.target.value)}
                                                className="border border-gray-300 rounded-md p-1"
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-2 text-lg">
                                            <button
                                                onClick={e => handleStatusChange(order._id, "Delivered")}
                                                className="bg-green-500 text-white py-1 px-4 rounded-md mr-2 hover:bg-green-600"
                                            >
                                                Mark As Delivered
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        No Order Found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrders;
