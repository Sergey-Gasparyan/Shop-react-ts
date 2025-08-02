import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types";


interface IInitialState {
  product: IProduct | null;
  productLoading: boolean;
  productError: string;
}

const initialState: IInitialState = {
  product: null,
  productLoading: false,
  productError: "",
};

export const createProduct = createAsyncThunk<void, IProduct>(
  "product/createProduct",
  async (product) => {
    await fetch("http://localhost:5000/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });
  }
);


export const fetchProduct = createAsyncThunk<IProduct, string>(
  "product/fetchProduct",
  async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    return await response.json();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
        state.productError = "";
      })
  },
});

export default productSlice.reducer;
