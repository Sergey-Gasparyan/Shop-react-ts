import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types";

interface IProductsState extends IProduct {
  comments: [];
  category: string;
  description: string;
  rating: number;
  quantity: number;
}

interface IState {
  products: IProductsState[];
  productsLoading: boolean;
  productsError: string;
  total : number
}

const initialState: IState = {
  products: [],
  productsLoading: false,
  productsError: "",
  total : 0
};

export const fetchProducts = createAsyncThunk<{data : IProductsState[] ,total : number}, string>(
  "products/fetchProducts",
  async (params) => {
    const url = `http://localhost:5000/products?${params}`;
    const response = await fetch(url);
    const data =  await response.json();
    const total = Number(response.headers.get("X-Total-Count"));
    return {data,total}
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
        state.products = action.payload.data
        state.total = action.payload.total
        state.productsError = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.error.message || 'error';
        state.products = [];
      })
  },
});

export default productsSlice.reducer;
