import { useSelector } from "react-redux";
import { FavouriteCard } from "../components/card/FavouriteCard.jsx";

const Favourites = () => {
  const favouriteProducts = useSelector((store) => store.favourites.favourites);

  if (favouriteProducts.length === 0) {
    return (
      <h1 style={{ fontSize: "30px", textAlign: "center", marginTop: "20px" }}>
        You Havn't Favouites :({" "}
      </h1>
    );
  }

  return (
    <div className="card-block favourite">
      {favouriteProducts?.map((favProduct) => (
        <FavouriteCard key={favProduct.id} product={favProduct}></FavouriteCard>
      ))}
    </div>
  );
};

export default Favourites;
