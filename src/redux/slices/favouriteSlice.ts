import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types";
import { AppDispatch } from "../store";


interface IFavInital {
  favourites: IProduct[];
  favouritesLoading: boolean;
  favouritesError: string;
}

const initialState: IFavInital = {
  favourites: [],
  favouritesLoading: false,
  favouritesError: "",
};

export const fetchFavourites = createAsyncThunk<IProduct[], void>(
  "favourites/fetchFavourites",
  async () => {
    const response = await fetch("http://localhost:5000/favourites");
    return await response.json();
  }
);

export const addToFavourites = createAsyncThunk<void, IProduct,{dispatch : AppDispatch}>(
  "favourites/addToFavourites",
  async (product, { dispatch }) => {
    await fetch("http://localhost:5000/favourites", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    dispatch(fetchFavourites());
  }
);

export const deleteFavourites = createAsyncThunk<void, string,{dispatch : AppDispatch}>(
  "favourites/deleteFavourites",
  async (id, { dispatch }) => {
    await fetch(`http://localhost:5000/favourites/${id}`, {
      method: "DELETE",
    });

    dispatch(fetchFavourites());
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.favouritesLoading = true;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favouritesLoading = false;
        state.favourites = action.payload;
        state.favouritesError = "";
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.favouritesLoading = false;
        state.favouritesError = action.error.message || "Failed to fetch favourites";
        state.favourites = [];
      });
  },
});

export default favouritesSlice.reducer;
