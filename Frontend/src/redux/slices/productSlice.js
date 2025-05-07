import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Asynk Thunk to Fetch Products by Collections and Optional Filter
export const fetchProductByFilter = createAsyncThunk(
  "/products/fetchByFilter",
  async ({
    category,
    gender,
    colors,
    sizes,
    material,
    brand,
    minPrice,
    maxPrice,
    collection,
    sortby,
    search,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (category) query.append("category", category);
    if (gender) query.append("gender", gender);
    if (colors) query.append("colors", colors);
    if (sizes) query.append("sizes", sizes);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortby) query.append("sortBy", sortby);
    if (search) query.append("search", search);
    if (limit) query.append("limit", limit);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product?${query.toString()}`
    );
    return response.data;
  }
);

// Asynk Thunk to Fetch Single Products by ID
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
    );
    return response.data;
  }
);

// Asynk Thunk to Update Product by ID
export const updateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// Asynk Thunk to similer Products by ID
export const similerProduct = createAsyncThunk(
  "/products/similerProduct",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/similer/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similerProducts: [],
    loading: false,
    error: null,
    filter: {
      category: "",
      gender: "",
      color: "",
      size: "",
      material: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortby: "",
      search: "",
      collection: "",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: (state) => {
      state.filter = {
        category: "",
        gender: "",
        color: "",
        size: "",
        material: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortby: "",
        search: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // ALL Product Details
      .addCase(fetchProductByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Single Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Updated Product Details
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex((product) => {
          product._id === updatedProduct._id;
        });
        if (index > -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // similer Product Details
      .addCase(similerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(similerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.similerProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(similerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;
