import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
        // ✅ Store in localStorage here (safe place)
      localStorage.setItem("checkoutSession", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.checkoutData);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    error: null,
    loading: false,
  },
  reducers: {
    setCheckout : (state,action) =>{
      state.checkout = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state ) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state , action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCheckout } = checkoutSlice.actions
export default checkoutSlice.reducer;

