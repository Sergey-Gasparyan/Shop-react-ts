import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import Sort from "../components/sort/Sort";
import { FavouriteCard } from "../components/card/FavouriteCard";
import { Pagination } from "antd";
import { ISearchParamsProps } from "../types/types";
import { useEffect } from "react";
import { fetchFavourites } from "../redux/slices/favouriteSlice";
import { fetchCarts } from "../redux/slices/cartSlice";
import { SetURLSearchParams } from "react-router-dom";

interface IMainProps extends ISearchParamsProps {
  setSearchParams:SetURLSearchParams
}

const MainPage:React.FC<IMainProps> = ({ handleChangeFilters, searchParams,setSearchParams,}) => {
  const { products, productsLoading, total } = useAppSelector((store) => store.products);

  const dispatch = useAppDispatch()

  const favouriteProducts = useAppSelector(
    (store) => store.favourites.favourites
  );
  
  const cartProducts = useAppSelector((store) => store.carts.carts);


    useEffect(() => {
      const copyParams = new URLSearchParams(searchParams)
      copyParams.set("_page", "1");
      setSearchParams(copyParams);
      dispatch(fetchFavourites());
      dispatch(fetchCarts());
    }, []);

  if (productsLoading) {
    return (
      <h1 className="loading">
        Loading...
      </h1>
    );
  }

  return (
    <main>
      <Sort
        handleChangeFilters={handleChangeFilters}
        searchParams={searchParams}
      />

      <div className="card-block">
        {products?.map((product) => (
          <FavouriteCard
            key={product.id}
            product={product}
            favouriteIds={favouriteProducts.map((p) => p.id)}
            cartIds={cartProducts.map((p) => p.id)}
          />
        ))}
      </div>

      <Pagination
        total={total}
        onChange={(page) => handleChangeFilters("_page", '' + page)}
        current={Number(searchParams.get("_page") || 1)}
        align="center"
      />
    </main>
  );
};

export default MainPage;
