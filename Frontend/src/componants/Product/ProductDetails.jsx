import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  similerProduct,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageChange, setImageChange] = useState();
  const [changeColor, setChangeColor] = useState("");
  const [changeSize, setChangeSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buttomDisable, setButtomDisable] = useState(false);
  // const [similarProducts, setSimilarProducts] = useState([]);
  const { similerProducts, selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { guestID, user } = useSelector((state) => state.auth);
  const featchId = productId || id;
  useEffect(() => {
    if (featchId) {
      // fetch Product Details and similer Products
      dispatch(fetchProductDetails({ id: featchId }));
      dispatch(similerProduct({ id: featchId }));
      setImageChange(null)
    }
  }, [dispatch, featchId]);
  

  const changeQuantity = (action) => {
    if (action === "minus" && quantity > 1) {
      setQuantity((i) => i - 1);
    } else if (action === "plus" && quantity < 10) {
      setQuantity((i) => i + 1);
    } else if (quantity == 10) {
      alert("You Can add 10 items at a time");
    }
  };

  const handlAddToCart = () => {
    if (!changeColor || !changeSize) {
      toast.error("Please Select Size and Colour Before Adding to Cart", {
        className: "bg-green-700 text-white",
        duration: 1000,
      });
      return;
    }
    // Else We do this Stuff
    setButtomDisable(true);

    dispatch(addToCart({
      productId: featchId,
      quantity: quantity,
      size: changeSize,
      color: changeColor,
      guestId: guestID,
      userId: user?._id
    })).then(() => {
      toast.success("Product Added Sucessfully !!", {
        duration: 1000
      });
    }).finally(() => {
      setButtomDisable(false);
    })
  };

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error...{error}</p>
  }

  return (
    <div className="p-4">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-3 md:p-8 rounded-lg ">
          {/* First Componant - Best Seller */}

          <div className="flex flex-col md:flex-row ">
            {/* Left Side */}
            {/* Left Thumbnail */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((p, i) => (
                <img
                  key={i}
                  onClick={() => setImageChange(p.url)}
                  src={p.url}
                  alt={p.altText || `Thumbnail ${i}`}
                  className="w-20 h-[100px] object-cover rounded-lg cursor-pointer border"
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={imageChange || selectedProduct.images[0].url}
                  alt={selectedProduct.images[0].altText}
                  className="w-96 h-[350px] md:h-[510px] object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Mobile Thumbnail */}
            <div className="md:hidden flex space-x-4 mb-4 overscroll-x-scroll ">
              {selectedProduct.images.map((p, i) => (
                <img
                  key={i}
                  src={p.url}
                  onClick={() => setImageChange(p.url)}
                  alt={p.altText || `Thumbnail ${i}`}
                  className="w-20 h-[100px] object-cover rounded-lg cursor-pointer border"
                />
              ))}
            </div>

            {/* Right Side */}
            <div className="md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <div className="flex gap-3">
                <p className="text-lg text-gray-600 mb-1 line-through">
                  {selectedProduct.orignalPrice &&
                    `$ ${selectedProduct.orignalPrice}`}
                </p>
                <p className="text-xl text-gray-700 mb-2 font-semibold">
                  $ {selectedProduct.price}
                </p>
              </div>
              <p className=" text-gray-600 mb-2">
                {selectedProduct.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-800 mb-1">Colors</p>
                <div className="flex flex-row gap-2 mb-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`rounded-full h-8 w-8 ${changeColor === color ? "border-slate-50 border-4" : ""
                        }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      onClick={() => setChangeColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-800 mb-1">Sizes</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      onClick={() => setChangeSize(size)}
                      key={size}
                      className={`px-4 py-2 rounded border ${changeSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">Quantity</p>
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    onClick={() => changeQuantity("minus")}
                    className="px-3 py-1 bg-gray-200 rounded text-2xl"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => changeQuantity("plus")}
                    className="px-3 py-1 bg-gray-200 rounded text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handlAddToCart}
                disabled={buttomDisable}
                className={`bg-black text-white px-2 py-2 rounded w-3/4 mt-4 ${buttomDisable
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
                  } `}
              >
                {buttomDisable ? "Adding ..." : "Add To Cart"}
              </button>

              <div className="mt-2 text-gray-700">
                <h3 className="text-xl font-bold mb-3 mt-4">Characterisics </h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td>{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Matrial</td>
                      <td>{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Second Componant - You may Also Like */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4  text-center">
              You May Like
            </h2>
            <ProductGrid products={similerProducts} loading={loading} error={error} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
