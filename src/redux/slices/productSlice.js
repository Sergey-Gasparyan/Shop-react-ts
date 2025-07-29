import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  comments:[],
  productLoading: false,
  productError: "",
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    return await response.json();
  }
);

export const fetchComments = createAsyncThunk(
  "products/fetchComments",
  async (id) => {
    const result = await fetch(`http://localhost:5000/comments?productId=${id}`);
    return await result.json();
  }
);

export const createComment = createAsyncThunk(
  "product/createComment",
  async (comment, { dispatch }) => {
    await fetch("http://localhost:5000/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    });

    dispatch(fetchComments(comment.productId));
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
      .addCase(fetchComments.fulfilled, (state,action) => {
        state.comments = action.payload;
      });
  },
});

export default productSlice.reducer;
