import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get Shortcut
const Backend_Url = `${import.meta.env.VITE_BACKEND_URL}`;
const Token = `Bearer ${localStorage.getItem("userToken")}`;

// create Async thunk to featch all products
export const getAllProducts = createAsyncThunk(
  "adminProduct/getAllProducts",
  async (params) => {
    const response = await axios.get(`${Backend_Url}/api/admin/products`, {
      headers: {
        Authorization: Token,
      },
    });
    return response.data;
  }
);

// create Async thunk to Create New products
export const createNewProduct = createAsyncThunk(
  "adminProduct/createNewProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Backend_Url}/api/product`,
        productData,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// create Async thunk to update the Existing
export const updateProduct = createAsyncThunk(
  "adminProduct/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${Backend_Url}/api/product/${id}`,
        productData,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// create Async thunk to Delete the Existing
export const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${Backend_Url}/api/product/${id}`, {
        headers: {
          Authorization: Token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // extraReducers of featch all products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // extraReducers of Create products
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      // extraReducers of Update products
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index > -1) {
          state.products[index] = action.payload;
        }
      })
      // extraReducers of Delete products
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      });
  },
});

export default adminProductSlice.reducer
