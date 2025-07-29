import { useSelector } from "react-redux";
import Sort from "../components/sort/Sort";
import { FavouriteCard } from "../components/card/FavouriteCard";
import { Pagination } from "antd";

const MainPage = ({ handleChangeFilters, searchParams }) => {
  const { products, productsLoading } = useSelector((store) => store.products);
  const favouriteProducts = useSelector((store) => store.favourites.favourites);
  const cartProducts = useSelector((store) => store.carts.carts);

  if (productsLoading) {
    return (
      <h1 style={{ fontSize: "30px", textAlign: "center", marginTop: "20px" }}>
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
        total={30}
        onChange={(page) => handleChangeFilters("_page", page)}
        current={Number(searchParams.get("_page") || 1)}
        align="center"
      />
    </main>
  );
};

export default MainPage;
