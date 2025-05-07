import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const AdminNewProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        countInStock: "",
        sku: "",
        sizes: [],
        colors: [],
        images: [],
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productData);
        dispatch(createNewProduct(productData))
        navigate("/admin/products");
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        console.log(file);
        const formData = new FormData();
        formData.append("image", file); // 'image' must match the key expected by your backend

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                })
            setProductData(prev => ({ ...prev, images: [...(prev.images || []), { url: `${import.meta.env.VITE_BACKEND_URL}${response.data.url}`, altText: "img" }] }))
        
        } catch (error) {
            console.error("Image upload failed", error);
        }

    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="border border-gray-200 shadow-sm p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={productData.name || ""}
                            onChange={handleOnChange}
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Description
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            value={productData.description}
                            onChange={handleOnChange}
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={productData.price}
                            onChange={handleOnChange}
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Count in Stock
                        </label>
                        <input
                            type="text"
                            name="countInStock"
                            value={productData.countInStock}
                            onChange={handleOnChange}
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            SKU
                        </label>
                        <input
                            type="text"
                            name="sku"
                            value={productData.sku}
                            onChange={handleOnChange}
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Sizes (comma-separated) Ex S,M...
                        </label>
                        <input
                            type="text"
                            name="sizes"
                            value={Array.isArray(productData.sizes) && productData.sizes.join(",")}
                            onChange={(e) =>
                                setProductData({
                                    ...productData,
                                    sizes: e.target.value.split(",").map((size) => size.trim()),
                                })
                            }
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Color (comma-separated) Ex Red,Blue...
                        </label>
                        <input
                            type="text"
                            name="colors"
                            value={Array.isArray(productData.colors) && productData.colors.join(", ")}
                            onChange={(e) =>
                                setProductData({
                                    ...productData,
                                    colors: e.target.value.split(",").map((color) => color.trim()),
                                })
                            }
                            className="border border-gray-300 p-1 focus:outline-none rounded"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="" className="text-sm mb-2 font-semibold">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="img"
                            onChange={handleImageUpload}
                            className="p-1 focus:outline-none rounded-md mb-2"
                        />
                        <div className="flex">
                            {productData?.images.length > 0 &&
                                productData?.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={index.altText}
                                        className="h-16 w-16 rounded-md mr-2 object-cover"
                                    />
                                ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white text-sm p-2 w-full rounded-md hover:bg-green-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminNewProducts