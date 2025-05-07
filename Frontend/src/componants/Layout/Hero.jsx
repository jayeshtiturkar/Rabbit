import React from 'react'
import Heroimage from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='relative'>
            <img src={Heroimage} alt="Rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[650px] object-cover' />
            <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center '>
                <div className='text-center text-white p-6'>
                    <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>Vaction <br /> Ready</h1>
                    <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore Our Vaction Ready Outfit With Fast word Wild Shipping.</p>
                    <Link className='bg-white text-gray-950 px-5 py-2 rounded-md text-lg'> Shop Now</Link>                
                </div>
            </div>
        </section>
    )
}

export default Hero