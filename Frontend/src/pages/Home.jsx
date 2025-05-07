import React, { useState ,useEffect} from "react";
import Hero from "../componants/Layout/Hero";
import GenderCollectionSection from "../componants/Product/GenderCollectionSection";
import NewArival from "../componants/Product/NewArival";
import ProductDetails from "../componants/Product/ProductDetails";
import ProductGrid from "../componants/Product/ProductGrid";
import FeaturedCollections from "../componants/Product/FeaturedCollections";
import Features from "../componants/Product/Features";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilter } from "../redux/slices/productSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Featch Product for Specific collection
    
    dispatch(
      fetchProductByFilter({
        category: "Bottom Wear",
        gender: "Women",
        limit: 8,
      })
    );

    // Featch the BestSeller Product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArival />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold my-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading BestSeller Product...</p>
      )}

      {/* Womans Collection */}
      <div className="mx-5 md:mx-20">
        <h2 className="text-3xl text-center font-bold my-4">
          Women's Collections
        </h2>
        <ProductGrid
          products={products}
          loading = {loading}
          error = {error}
          className="h-50 md:h-full w-20 md:w-full"
        />
      </div>

      {/* Featured Image */}
      <FeaturedCollections />

      <Features />
    </div>
  );
};

export default Home;
