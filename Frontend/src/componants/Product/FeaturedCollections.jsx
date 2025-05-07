import React from "react";
import {Link} from 'react-router-dom'
import fetureImage from "../../assets/featured.webp"

const FeaturedCollections = () => {
    return (
        <section className="m-4 md:m-10 md:pl-6">
            <div className="flex flex-col-reverse md:flex-row">
                <div className="flex flex-col space-x-3 p-10 justify-center bg-slate-200 rounded-b-2xl md:rounded-none md:rounded-l-2xl">
                    <p className="font-semibold px-3 mb-2">Comfort and Style</p>
                    <h1 className="text-3xl font-extrabold mb-2">Apparel made for your <br /> everyday Life</h1>
                    <p className="mb-2">
                        {" "}
                        Discover high-quality, comfortable clothing that effortlessy blends
                        fashion and
                        <br /> function. Design to make you look and feel great every day. {" "}
                    </p>
                    <div className="mt-2">
                        <Link to={"/collections/all"} className="bg-black text-white py-2 px-4 rounded-lg">Shop Now</Link>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <img src={fetureImage} alt="Featured Image" className="rounded-t-2xl md:rounded-none md:rounded-r-2xl object-cover"/>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
