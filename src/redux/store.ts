import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./slices/favouriteSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/registrtionSlice";
import { brandsApi } from "../queryies/brandApi";
import { commentsApi } from "../queryies/commentsApi";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    products: productsReducer,
    carts: cartReducer,
    product: productReducer,
    user: userReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brandsApi.middleware, commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
