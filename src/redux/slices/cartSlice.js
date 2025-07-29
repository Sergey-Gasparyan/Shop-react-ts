import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  cartsLoading: false,
  cartsError: "",
};

export const fetchCarts = createAsyncThunk(
  "carts/fetchFavourites",
  async () => {
    const response = await fetch("http://localhost:5000/carts");
    return await response.json();
  }
);

export const updateCarts = createAsyncThunk(
  "favourites/updateCarts",
  async (updatedProduct, { dispatch }) => {
    await fetch(`http://localhost:5000/carts/${updatedProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: { "Content-Type": "application/json" },
    });

    dispatch(fetchCarts());
  }
);


export const addToCarts = createAsyncThunk(
  "favourites/addToCarts",
  async (product, { dispatch }) => {
    await fetch("http://localhost:5000/carts", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    dispatch(fetchCarts());
  }
);

export const deleteCart = createAsyncThunk(
  "favourites/deleteCart",
  async (id, { dispatch }) => {
    await fetch(`http://localhost:5000/carts/${id}`, {
      method: "DELETE",
    });

    dispatch(fetchCarts());
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.cartsLoading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.cartsLoading = false;
        state.carts = action.payload;
        state.cartsError = "";
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.cartsLoading = false;
        state.cartsError = action.payload;
        state.carts = [];
      });
  },
});

export default cartsSlice.reducer;
