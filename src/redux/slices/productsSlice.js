import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  comments: [],
  productsLoading: false,
  productsError: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const url = `http://localhost:5000/products?${params}`;
    const response = await fetch(url);
    return await response.json();
  }
);



const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload;
        state.productsError = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.payload;
        state.products = [];
      });
  },
});

export default productsSlice.reducer;
