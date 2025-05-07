import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const featchUserOrder = createAsyncThunk(
  "order/featchUserOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(first);
      return rejectWithValue(error.response.message);
    }
  }
);

export const featchOrderDetails = createAsyncThunk(
  "order/featchOrderDetails",
  async ({ orderid }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // To Feactch All Order
      .addCase(featchUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(featchUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // To Feactch Single Order
      .addCase(featchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(featchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
