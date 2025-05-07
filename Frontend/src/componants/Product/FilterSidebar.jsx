import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Colors = [
    "Red",
    "Blue",
    "Green",
    "Fuchsia",
    "Yellow",
    "Lime",
    "Gray",
    "White",
    "Black",
    "Pink",
];

const Sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const Material = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fieece",
];
const Brand = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
];

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        category: "",
        gender: "",
        colors: "",
        sizes: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100
    });;

    useEffect(() => {
        const params = Object.fromEntries([...searchParams])
        setFilter({
            category: params.category || "",
            gender: params.gender || "",
            colors: params.colors || "",
            sizes: params.sizes ? params.sizes.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice  || 100
        })
    }, [searchParams]);

    const handlefileChange = (e) => {
        const {name, value,checked,type} = e.target;
        const newFilter = {...filter};

        if (type === "checkbox") {
            if (checked) {
                newFilter[name] = [...(newFilter[name] || []) ,value]
            }else {
                newFilter[name] = newFilter[name].filter((prevval) => prevval !== value)
            }
        }else{
            newFilter[name] = value;
        }
        setFilter(newFilter)
        updateURLOnParams(newFilter)
    }

    // To Genrate URL
    const updateURLOnParams = (newFilter) =>{
        const params = new URLSearchParams()

        Object.keys(newFilter).forEach((key) =>{
            if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
                params.append(key,newFilter[key].join(","))
            } else if (newFilter[key]) {
                params.append(key,newFilter[key])
            }
            
        });
        setSearchParams(params)
        navigate(`?${params.toString()}`)
    }
    
    // To Manage Price Range
    const handlePriceRange = (e) =>{
        const newPrice = e.target.value
        const newFilter = {...filter, minPrice:0, maxPrice:newPrice}
        setFilter(newFilter)
        updateURLOnParams(newFilter)

    }

    return (
        <>
            {/* menu Bar */}
            <div className="space-y-4 ml-4 sm:ml-0">
                <h2 className="text-xl font-semibold">Filter</h2>
                {/* For Category */}
                <div className="my-2">
                    <h4 className="text-gray-500 font-semibold">Category</h4>
                    <div className="flex flex-col my-2">
                        <label htmlFor="">
                            <input
                                type="radio"
                                name="category"
                                value="Top Wear"
                                checked = {filter.category === "Top Wear"}
                                onChange={handlefileChange}
                                className="mb-2"
                            />
                            <span className="text-gray-700 ml-2">Top Wear</span>
                        </label>
                        <label htmlFor="">
                            <input
                                type="radio"
                                name="category"
                                value="Bottom Wear"
                                checked = {filter.category === "Bottom Wear"}
                                onChange={handlefileChange}
                            />
                            <span className="text-gray-700 ml-2">Bottom Wear</span>
                        </label>
                    </div>
                </div>

                {/* For Gender */}
                <div className="my-2">
                    <h4 className="text-gray-500 font-semibold">Gender</h4>
                    <div className="flex flex-col my-2">
                        <label htmlFor="">
                            <input
                                type="radio"
                                name="gender"
                                value="Men"
                                checked = {filter.gender === "Men"}
                                onChange={handlefileChange}
                                className="mb-2"
                            />
                            <span className="text-gray-700 ml-2">Men</span>
                        </label>
                        <label htmlFor="">
                            <input
                                type="radio"
                                name="gender"
                                value="Women"
                                checked = {filter.gender === "Women"}
                                onChange={handlefileChange}
                            />
                            <span className="text-gray-700 ml-2">Women</span>
                        </label>
                    </div>
                </div>

                {/* For Colors */}
                <div>
                    <h4 className="text-gray-500 font-semibold">Colors</h4>
                    <div>
                        {Colors.map((c, i) => (
                            <button
                                value={c}
                                name= "colors"
                                key={i}
                                onClick={handlefileChange}
                                className={`h-7 w-7 m-1 rounded-full cursor-pointer transition hover:scale-105 ${c === filter.color
                                    ? "border-4 border-blue-400"
                                    : "border-2 border-gray-400"
                                    }`
                                }
                                style={{backgroundColor : c.toLowerCase()}}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* For Size */}
                <div>
                    <h4 className="text-gray-500 font-semibold">Size</h4>
                    <div className="flex flex-col space-y-1 mt-2">
                        {Sizes.map((s, i) => (
                            <label htmlFor="" key={i}>
                                <input
                                    type="checkbox"
                                    name="sizes"
                                    value={s}
                                    checked = {filter.sizes.includes(s)}
                                    onChange={handlefileChange}
                                    className="mb-2"
                                />
                                <span className="text-gray-700 ml-2">{s}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* For Material */}
                <div>
                    <h4 className="text-gray-500 font-semibold">Material</h4>
                    <div className="flex flex-col space-y-1 mt-2">
                        {Material.map((m, i) => (
                            <label htmlFor="" key={i}>
                                <input
                                    type="checkbox"
                                    name="material"
                                    value={m}
                                    checked = {filter.material.includes(m)}
                                    onChange={handlefileChange}
                                    className="mb-2"
                                />
                                <span className="text-gray-700 ml-2">{m}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* For Brand */}
                <div>
                    <h4 className="text-gray-500 font-semibold">Brand</h4>
                    <div className="flex flex-col space-y-1 mt-2">
                        {Brand.map((b, i) => (
                            <label htmlFor="" key={i}>
                                <input
                                    type="checkbox"
                                    name="brand"
                                    value={b}
                                    checked = {filter.brand.includes(b)}
                                    onChange={handlefileChange}
                                    className="mb-2"
                                />
                                <span className="text-gray-700 ml-2">{b}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* For Price Range */}
                <div>
                    <h4 className="text-gray-500 font-semibold">Price Range</h4>
                    <div className="flex flex-col space-y-1 mt-2">
                        <input
                            name="range"
                            type="range"
                            min="0"
                            max="100"
                            value={filter.maxPrice}
                            onChange={handlePriceRange}
                            className="w-3/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-1"
                        />
                        <div className="w-3/4 flex justify-between">
                            <p>${filter.minPrice}</p>
                            <p>${filter.maxPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;
