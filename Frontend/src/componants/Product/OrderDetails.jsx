import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { featchOrderDetails } from "../../redux/slices/orderSlice";

const OrderDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const { orderDetails } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(featchOrderDetails({ orderid: id }))
  }, [id, dispatch]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold my-4 ml-4">Order Details</h1>
      {orderDetails && (
        <div className="border rounded-lg p-4">
          {/* OrderId And Date */}
          <div className="flex justify-between mb-8">
            <div className="m-2">
              <h3 className="font-semibold">Order ID : #{orderDetails._id}</h3>
              <p>Order Date :{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="m-1">
              <p
                className={`${orderDetails.isPaid
                    ? "text-emerald-700 bg-emerald-100"
                    : "text-red-700 bg-red-100"
                  }
              rounded-lg py-1 px-2 text-xs font-semibold mb-2
              `}
              >
                {orderDetails.isPaid ? "Apporved" : "Wating"}
              </p>
              <p
                className={`${!orderDetails.isDeliverd
                    ? "text-yellow-700 bg-yellow-100"
                    : "text-red-700 bg-red-100"
                  }
              rounded-lg py-1 px-2 text-xs font-semibold
              `}
              >
                {orderDetails.isDeliverd ? "Deliverd" : "Pending"}
              </p>
            </div>
          </div>

          {/* Payment And Shpping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 m-2 mb-8">
            <div>
              <h3 className="font-semibold">Payment Info</h3>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "UnPaid"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Shipping Info</h3>
              <p>Address</p>
              <p>
                {orderDetails.shippingAddress.address}, {" "}
                <br />
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.country}{" "}
              </p>
            </div>
          </div>

          {/* List Of Products */}
          <div className="m-2">
            <h3 className="font-semibold mb-2">Products</h3>
            <div>
              {/* Note ==> In Table to Access rounded your have to use overflow-hidden */}

              <table className="w-full rounded-md overflow-hidden">
                <thead className="bg-gray-200 rounded-t-lg font-semibold text-sm ">
                  <tr className="">
                    <td className="px-2 py-1">Name</td>
                    <td>Unit Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderDetails.orderItmes &&
                    orderDetails.orderItmes.map((item) => (
                      <tr className="mt-2 border-b" key={item._id}>
                        <td className="flex mt-2 pb-2 text-sm items-center"><img src={item.image} alt={item.name} className="h-12 w-10 mr-2 rounded-sm " /><span className="text-blue-500 hover:underline">{item.name}</span></td>
                        <td className="text-sm">${item.price}</td>
                        <td className="text-sm">{item.quantity}</td>
                        <td className="text-sm">${item.price * item.quantity}</td>
                      </tr>
                    ))

                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="m-2 mt-3">
            <Link to={"/my-orders"}>
              <span className="text-blue-500 hover:underline">Back to My Order</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
