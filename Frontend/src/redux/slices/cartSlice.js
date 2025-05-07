import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper Function to load cart from Local Storage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper Function to Save the cart in localStorage
const saveCarttoLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Async Thunk for Create new Cart
//********* FIXME: This breaks if cartData is not an Valid Object ***********
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        cartData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for Get Cart Data
export const getCartData = createAsyncThunk(
  "cart/getCartData",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          params: {
            guestId, // sends ?guestID=guest_1746092670762
            userId,
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

// Async Thunk To Update the Product (***Quntity Only****) in the Cart
export const updateCartItemQuantitiy = createAsyncThunk(
  "/cart/updateCartItemQuantitiy",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, quantity, size, color, guestId, userId }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//  Async Thunk Remove the item From the Cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, size, color, guestId, userId },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk Merge Cart API CALL
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer For getCartData
      .addCase(getCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCarttoLocalStorage(action.payload);
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed To Featch Card";
      })

      // Reducer For AddToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCarttoLocalStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed Add To Card";
      })

      // Reducer to Update Cart Quantity
      .addCase(updateCartItemQuantitiy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantitiy.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCarttoLocalStorage(action.payload);
      })
      .addCase(updateCartItemQuantitiy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed Update Cart  Quantity";
      })

      // Reducer to Remove Product From Cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCarttoLocalStorage(action.payload);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed Delete Cart Quantity";
      })

      // Reducer to Merge  Cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCarttoLocalStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Marge Cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
