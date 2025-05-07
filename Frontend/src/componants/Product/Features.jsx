import React from 'react'
import { Link } from 'react-router-dom'
import { IoBagHandleSharp } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { GrPowerCycle } from "react-icons/gr";

const Features = () => {
    return (
        <section className='m-10 md:m-20'>
            <div className='flex flex-col lg:flex-row justify-between px-8 md:px-20 space-y-10 md:space-y-0'>
                <div >
                    <Link className='flex flex-col items-center'>
                        <IoBagHandleSharp className='mb-6 h-6 w-6'/>
                        <h2 className='mb-2 font-semibold'>FREE INTERNATIONAL SHIPPING</h2>
                        <p className='text-sm'>On all orders over $100.00</p>
                    </Link>
                </div>
                <div>
                    <Link className='flex flex-col items-center'>
                        <GrPowerCycle className='mb-6 h-6 w-6'/>
                        <h2 className='mb-2 font-semibold'>45 DAYES RETURN</h2>
                        <p className='text-sm'>Money back gaurantee</p>
                    </Link>
                </div>
                <div className='text-sm'>
                    <Link className='flex flex-col items-center'>
                        <CiCreditCard1 className='mb-6 h-6 w-6'/>
                        <h2 className='mb-2 font-semibold'>SECURE CHECKOUT</h2>
                        <p className='text-sm'>100% Secure checkout process</p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Features