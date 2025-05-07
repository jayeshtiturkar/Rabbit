import React, { useEffect } from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa";
import { getCartData, removeItemFromCart, updateCartItemQuantitiy } from "../../redux/slices/cartSlice"

const CartContent = ({ toggleCartDrawer }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { guestID, user } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)

    const cartProducts = cart.products
    const handleQuntityChange = (e, product) => {
        const { value } = e.target
        if (value === "add") {
            dispatch(updateCartItemQuantitiy({ guestId: guestID, userId: user?._id, ...product, quantity: 1 }))
        } else {
            dispatch(updateCartItemQuantitiy({ guestId: guestID, userId: user?._id, ...product, quantity: -1 }))
        }

    }

    const handleDeleteProduct = (e, product) => {
        dispatch(removeItemFromCart({ guestId: guestID, userId: user?._id, ...product }))
    }
    const hanlebuynew = () => {
        toggleCartDrawer()
    }
    useEffect(() => {
        if (user?._id) {
            dispatch(getCartData({ guestID, userId: user._id }));
        }
    }, [user,guestID,dispatch]);
    return (
        <div>
            {
                cartProducts.map((product, index) => (
                    <div key={index} className='flex items-start justify-between py-4 border-b'>
                        <div className='flex items-start'>
                            <img src={product.image} alt={product.name} className='w-16 h-20 sm:w-20 sm:h-24 object-cover mr-4 rounded' />
                            <div >
                                <h3>{product.name}</h3>
                                <p>size : {product.size} | colour : {product.color}</p>
                                <div className='flex items-center mt-2'>
                                    <button className='border rounded px-2 py-1 text-xl font-medium' value={"remove"} onClick={(e) => handleQuntityChange(e, product)}>-</button>
                                    <span className='mx-4'>{product.quantity}</span>
                                    <button className='border rounded px-2 py-1 text-xl font-medium' value={"add"} onClick={(e) => handleQuntityChange(e, product)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='font-medium'>${product.price}</p>
                            <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-500' onClick={(e) => handleDeleteProduct(e, product)} />
                        </div>
                    </div>
                ))
            }
            {cartProducts == 0 &&
                <div>
                    <div className='text-xl pt-4 text-center'>Ooops Empty Cart.. !</div>
                    <Link to={"/collections/all"} onClick={hanlebuynew} className='text-lg text-blue-600 text-center flex items-center justify-center mt-2'><FaArrowCircleLeft className='mr-1' />
                        Lets Buy Something <br /> For You..</Link>
                </div>
            }
        </div>
    )
}

export default CartContent