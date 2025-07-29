import {useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Favourites from "./pages/FavouritePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import { useDispatch } from "react-redux";
import CartPage from "./pages/CartPage.jsx";
import Product from "./pages/Product.jsx";
import Header from "./components/header/Header.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { Drawer } from "antd";
import { fetchProducts } from "./redux/slices/productsSlice.js";
import "./App.css";
import { fetchFavourites } from "./redux/slices/favouriteSlice.js";
import { fetchCarts } from "./redux/slices/cartSlice.js";

function App() {
  const [isNavBarOpened, setIsNavBarOpened] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const copyParams = new URLSearchParams(searchParams);

  const handleChangeFilters = (key, value) => {
    if (copyParams.get(key) === value || !value) {
      copyParams.delete(key);
      key === "_order" && copyParams.delete("_sort");
    } else if (key === "_order") {
      copyParams.set("_sort", "price");
      copyParams.set("_order", value);
    } else copyParams.set(key, value);

    if (key !== "_page") copyParams.set("_page", 1);

    setSearchParams(copyParams);
  }

  useEffect(() => {
    copyParams.set("_page", 1);
    setSearchParams(copyParams);
    dispatch(fetchFavourites())
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchProducts(searchParams.toString()));
    }
  }, [searchParams]);

  const openDrawer = () => setIsNavBarOpened(true);
  const closeDrawer = () => setIsNavBarOpened(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                handleChangeFilters={handleChangeFilters}
                hanndleNavBar={openDrawer}
                searchParams={searchParams}
              />
              <Drawer
                open={isNavBarOpened}
                onClose={closeDrawer}
                placement="left"
              >
                <Navbar
                  handleChangeFilters={handleChangeFilters}
                  searchParams={searchParams}
                />
              </Drawer>

              <MainPage
                handleChangeFilters={handleChangeFilters}
                searchParams={searchParams}
              />
            </>
          }
        />
        <Route path="favourites" element={<Favourites />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;