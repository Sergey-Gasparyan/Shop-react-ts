import { useEffect } from "react";
import { FavouriteCard } from "../components/card/FavouriteCard.js";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks.js";
import { fetchFavourites } from "../redux/slices/favouriteSlice.js";

const Favourites = () => {
  const favouriteProducts = useAppSelector(
    (store) => store.favourites.favourites
  );

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFavourites())
  },[])

  if (favouriteProducts.length === 0) {
    return (
      <h1 className="empty">
        You Havn't Favouites :({" "}
      </h1>
    );
  }

  return (
    <div className="card-block favourite">
      {favouriteProducts?.map((favProduct) => (
        <FavouriteCard key={favProduct.id} product={favProduct} />
      ))}
    </div>
  );
};

export default Favourites;
