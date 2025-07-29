import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./slices/favouriteSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice"

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    products: productsReducer,
    carts: cartReducer,
    product : productReducer
  }
});
