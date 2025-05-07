import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { checkout } = useSelector((state) => state.checkout);
  const [addressForm, setAddressForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    dispatch(createCheckout({
      checkoutItmes: cart.products,
      shippingAddress: addressForm,
      paymentMethod: "Cash On Delivary",
      totalPrice: cart.totalprice
    }))
    e.preventDefault();
  };

  useEffect(() => {
    if (checkout) {
      dispatch(clearCart())
      navigate(`/order-confirmation?checkout=${checkout._id}`);
    }
  }, [checkout]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-2 md:my-8 px-2 md:px-20">
      {/* Left Side */}
      <div className="md:grid itmes-center justify-center">
        <div className="flex flex-col">
          <h2 className="text-xl uppercase mb-4 font-bold">Checkout</h2>
          <p className="font-semibold mb-4">Contact Details</p>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="border rounded-md border-gray-300 px-2 mr-4 bg-gray-50 font-semibold p-1 text-sm"
              />
            </div>
            <h2 className="font-semibold mb-1">Delivery</h2>
            <div className="md:flex justify-center items-center gap-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-sm">
                  First Name
                </label>
                <input
                  required
                  type="firstname"
                  value={addressForm.firstname}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      firstname: e.target.value,
                    })
                  }
                  className="border border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-sm">
                  Last Name
                </label>
                <input
                  required
                  type="lastname"
                  value={addressForm.lastname}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, lastname: e.target.value })
                  }
                  className="border border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2>Address</h2>
              <input
                required
                type="text"
                value={addressForm.address}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, address: e.target.value })
                }
                className="border border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
              />
            </div>
            <div className="md:flex justify-center items-center gap-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-sm">
                  City
                </label>
                <input
                  required
                  type="name"
                  value={addressForm.city}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, city: e.target.value })
                  }
                  className="border border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-sm">
                  Postal Code
                </label>
                <input
                  required
                  type="name"
                  value={addressForm.pincode}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      pincode: e.target.value,
                    })
                  }
                  className="border border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2>Country</h2>
              <input
                required
                type="text"
                value={addressForm.country}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, country: e.target.value })
                }
                className="border border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <h2>Phone</h2>
              <input
                required
                type="number"
                value={addressForm.phone}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, phone: e.target.value })
                }
                className=" border mb-4 border-gray-200 px-2 mr-4 shadow-sm focus:outline-none focus:border-gray-400 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white text-center rounded-md py-2  w-full"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-gray-100 mx-4 px-6 py-4 rounded-lg mt-6">
        <h2 className="pb-4 font-semibold border-b ">Order Summary</h2>
        <div className="my-4">
          {cart.products.map((prod, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <div className="flex flex-row">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="h-16 w-12 rounded-sm"
                />
                <div className="flex flex-col mx-4 space-y-2">
                  <h1 className="font-semibold text-sm">{prod.name}</h1>
                  <p className="text-sm">Size: {prod.size}</p>
                  <p className="text-sm">Color: {prod.color}</p>
                </div>
              </div>
              <div className=" flex flex-col space-y-2">
                <div className="font-bold">${prod.price}</div>
                <p className="text-sm">Quantity: {prod.quantity}</p>
                <p className="text-sm">Total: {prod.quantity * prod.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-2">
          <p className="font-semibold text-sm">Subtotal</p>
          <p className="font-bold">${Math.ceil(cart.totalprice)}</p>
        </div>
        <div className="flex justify-between border-b py-2">
          <p className="font-semibold text-sm">Shipping</p>
          <p className="font-bold">Free</p>
        </div>
        <div className="flex justify-between py-2">
          <p className="font-semibold">Total</p>
          <p className="font-bold">${Math.ceil(cart.totalprice)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
