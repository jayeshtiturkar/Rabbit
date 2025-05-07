import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";


const NewArival = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        const fetchNewArrival = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrival`)
                setNewArrivals(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchNewArrival()
    }, [])
    const updateScrollButton = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable =
                container.scrollWidth > leftScroll + container.clientWidth;
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);

        }

    };
    const haldleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft)

    }

    const haldleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;

    }
    const haldleMouseUpOrLeave = () => {
        setIsDragging(false)
    }

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmout = direction === "left" ? -333 : 333;
        container.scrollBy({ left: scrollAmout, behaviour: "smooth" });
    };
    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButton);
            updateScrollButton();
            return () => container.removeEventListener("scroll", updateScrollButton);
        }
        
    }, [newArrivals]);


    return (
        <section className="py-10 px-4 lg:py-0">
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl mb-4 font-bold">Explore New Arrival</h2>
                <p className="text-lg mb-8 font-bold">
                    Discover the Latest style straight of the runway, freshly added to
                    keep your wardrobe on the cutting age of Fasion
                </p>

                {/* Scrollable Button */}
                <div className="absolute bottom-[-30px] right-0 flex space-x-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded border ${canScrollLeft
                            ? "bg-white text-black"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded border ${canScrollRight
                            ? "bg-white text-black"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div
                ref={scrollRef}
                onMouseDown={haldleMouseDown}
                onMouseMove={haldleMouseMove}
                onMouseUp={haldleMouseUpOrLeave}
                onMouseLeave={haldleMouseUpOrLeave}
                className={`container mx-auto overflow-x-scroll scrollbar-hide flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
                {newArrivals.map((product, index) => {
                    // ❗ When you use Map and dont want return use () 🚨  or inside function retun if u use {} 🚨
                    return (
                        <div
                            key={index}
                            className=" min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] relative"
                        >
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-[400px] md:h-[450px] object-cover rounded-lg"
                                draggable="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                                <Link to={`product/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">$ {product.price}</p>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default NewArival;
