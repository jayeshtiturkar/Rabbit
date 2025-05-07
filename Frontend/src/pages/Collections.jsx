import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ProductGrid from "../componants/Product/ProductGrid";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../componants/Product/FilterSidebar";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilter } from "../redux/slices/productSlice";


const Collections = () => {
    const {collection } = useParams();
    const [searchParams,setSearchParams] = useSearchParams();
    const queryParams= Object.fromEntries([...searchParams])
    const dispatch = useDispatch()
    const { products , loading , error} = useSelector((state) => state.products)
    const sidebarRef = useRef(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
    dispatch(fetchProductByFilter({collection, ...queryParams}))

    }, [dispatch,collection,searchParams]);
    const toggalSideBar = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    const closeSideBar = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsDrawerOpen(false)
        }
    }
    useEffect(() => {
        // Add Event Listner on CLick
        document.addEventListener("mousedown", closeSideBar)
        // Clean Event Listner
        return () => {
            document.removeEventListener("mousedown", closeSideBar)
        }
    }, []);

    const handleChangeSort = (e) => {
        const sortBy = e.target.value;
        searchParams.set("sortby", sortBy)
        setSearchParams(searchParams)
    }
    return (
        <section>
            <div className="flex flex-col md:flex-row m-2 md:m-6">
                {/* Mobile Filter Button*/}
                <div className="flex justify-center border-b border-gray-300">
                    <button onClick={toggalSideBar} className="md:hidden flex items-center mb-1">
                        <FaFilter className="h-4 w-4 mr-1" />
                        <span className="text-sm font-semibold">Filters</span>
                    </button>
                </div>

                {/* Filter Sidebar Componant */}
                <div ref={sidebarRef} className={`${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50
                left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                    <FilterSidebar />
                </div>

                {/* All Collection */}
                <div className="flex-grow">
                    <h1 className="m-2 font-bold text-xl">ALL COLLECTION</h1>
                    <div className="flex justify-end">
                        <select
                            className="border-2 shadow-sm border-gray-400 font-medium text-sm rounded mx-4 p-1 focus:outline-none"
                            name="category"
                            id=""
                            value={searchParams.get("SortBy") || ""}
                            onChange={handleChangeSort}
                        >
                            <option value="all">Default</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>

                    {/* ALL Posts */}
                    <div>
                        <ProductGrid products={products} loading={loading} error={error} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Collections;
