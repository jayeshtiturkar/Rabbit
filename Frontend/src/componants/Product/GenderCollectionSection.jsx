import React from "react";
import MenImage from "../../assets/mens-collection.webp";
import WoManImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto flex flex-col md:flex-row gap-8">

                {/* Means Collection */}
                <div className="relative flex-1">
                    <img
                        src={MenImage}
                        alt="Means Collection"
                        className=" w-full sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-3xl"
                    />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h1 className="font-bold text-gray-900 mb-3 text-3xl">
                            Men's Collection
                        </h1>
                        <Link to="/collections/all?gender=Men" className="text-gray-900 underline">Shop Now</Link>
                    </div>
                </div>

                {/* Womeans Collection */}

                <div className="relative flex-1">
                    <img
                        src={WoManImage}
                        alt="Woman's Collection"
                        className=" w-full sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-3xl"
                    />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h1 className="font-bold text-gray-900 mb-3 text-3xl">
                            Woman's Collection
                        </h1>
                        <Link to="/collections/all?gender=Women" className="text-gray-900 underline">Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GenderCollectionSection;
