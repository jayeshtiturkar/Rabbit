import React, { useEffect, useState } from "react";
import LoginImg from "../../src/assets/register.webp";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const { user, guestID, loading } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestID) {
                dispatch(mergeCart({ guestId: guestID, user })).then(
                    () => navigate(redirect)
                )
            } else {
                navigate(redirect)
            }
        }
    }, [user, guestID, cart, navigate, dispatch]);

    const handlesubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }))
    }

    return (
        <section className="my-10 md:my-0">
            <div className="flex flex-col-reverse md:flex-row justify-center items-center">
                {/* Srction 1 */}
                <div className="flex flex-col justify-center items-center text-center px-0 md:px-16 w-full md:w-2/4 ">
                    <div className="border shadow-sm p-9 my-10 md:p-12 rounded-lg w-5/6 md:w-4/6">
                        <div className="space-y-3">
                            <h4 className="font-semibold">Rabbit</h4>
                            <h1 className="font-bold text-xl">Welcome! 👋🏻</h1>
                            <p className="text-sm font-semibold">
                                Please Fill in your details to create an account.
                            </p>
                        </div>
                        <form onSubmit={handlesubmit} className="flex flex-col my-5">
                            <label htmlFor="" className="text-left font-semibold text-sm">
                                Name
                            </label>
                            <input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your Name"
                                className="my-2 border rounded-md focus:border-blue-400 outline-none p-2 text-sm"
                            />
                            <label htmlFor="" className="text-left font-semibold text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="my-2 border rounded-md focus:border-blue-400 outline-none p-2 text-sm"
                            />
                            <label htmlFor="" className="text-left font-semibold text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="my-2 border rounded-md focus:border-blue-400 outline-none p-2 text-sm"
                            />
                            <button className="bg-black text-white rounded-md mt-2 p-2">
                            {loading  ? "Loading..." :"Sign Up"}
                            </button>
                        </form>
                        <h4 className="text-sm">
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-blue-500">
                                Login
                            </Link>
                        </h4>
                    </div>
                </div>
                {/* Section 2 */}
                <div className="hidden md:block w-1/2">
                    <img
                        src={LoginImg}
                        alt="LogIn Image"
                        className="w-full h-[600px] object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Login;
