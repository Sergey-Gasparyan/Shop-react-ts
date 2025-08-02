import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Favourites from "./pages/FavouritePage.tsx";
import MainPage from "./pages/MainPage.tsx";
import { useAppDispatch } from "./redux/reduxHooks";
import CartPage from "./pages/CartPage.tsx";
import Product from "./pages/Product.tsx";
import Header from "./components/header/Header.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import { Drawer } from "antd";
import { fetchProducts } from "./redux/slices/productsSlice.ts";
import "./App.css";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import Admin from "./components/admin/Admin.tsx";

function App() {
  const [isNavBarOpened, setIsNavBarOpened] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const copyParams = new URLSearchParams(searchParams);

  const handleChangeFilters = (key: string, value: string): void => {
    if (copyParams.get(key) === value || !value) {
      copyParams.delete(key);
      key === "_order" && copyParams.delete("_sort");
    } else if (key === "_order") {
      copyParams.set("_sort", "price");
      copyParams.set("_order", value);
    } else copyParams.set(key, value);

    if (key !== "_page") copyParams.set("_page", "1");

    setSearchParams(copyParams);
  };

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
                setSearchParams={setSearchParams}
              />
            </>
          }
        />
        <Route path="favourites" element={<Favourites />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="admin" element={<PrivateRoute><Admin /></PrivateRoute>}></Route>
      </Routes>
    </>
  );
}

export default App;