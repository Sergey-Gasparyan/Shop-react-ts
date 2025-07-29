import { Link } from "react-router-dom";
import "./Header.scss";
import { debounce } from "lodash";
import { Input } from "antd";
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = ({ handleChangeFilters, hanndleNavBar, searchParams }) => {
  const debounceHandler = debounce(
    (e) => handleChangeFilters("q", e.target.value),
    800
  );

  const cartsProduct = useSelector((store) => store.carts.carts);
  const favouriteProducts = useSelector((store) => store.favourites.favourites);

  const productCartQuantity = cartsProduct.reduce(
    (acc, el) => acc + el.quantity,
    0
  );

  const productFavouriteQuantity = favouriteProducts.reduce(
    (acc, el) => acc + el.quantity,
    0
  );

  const filters =
    searchParams.get("price_gte") ||
    searchParams.get("category") ||
    searchParams.get("price_lte");

  return (
    <header className="header">
      <div>
        <Link
          to="/"
          style={{
            fontSize: "55px",
            fontFamily: "Playwrite NG Modern, cursive",
          }}
        >
          Sals
        </Link>
      </div>
      <div className="menuIconWrapper">
        <div onClick={hanndleNavBar} style={{ cursor: "pointer" }}>
          <MenuOutlined style={{ fontSize: "45px" }} />
        </div>
        {filters && <div className="circle"></div>}
      </div>
      <Input
        onChange={debounceHandler}
        defaultValue={searchParams.get("q") || ""}
        type="text"
        placeholder="Filter by name ..."
      />
      <div className="header-nav" style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          <Link to="/cart" style={{ marginRight: "10px" }}>
            <ShoppingCartOutlined style={{ fontSize: "50px" }} />
          </Link>
          {productCartQuantity !== 0 && (
            <div
              style={{
                fontSize: "22px",
                position: "absolute",
                top: "0",
                right: "-12px",
              }}
            >
              {productCartQuantity}
            </div>
          )}
        </div>
        <div style={{ position: "relative", marginLeft: "40px" }}>
          <Link to="/favourites">
            <HeartOutlined style={{ fontSize: "45px" }} />
          </Link>
          {productFavouriteQuantity !== 0 && (
            <div
              style={{
                fontSize: "22px",
                position: "absolute",
                top: "0",
                left: "52px",
              }}
            >
              {productFavouriteQuantity}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
