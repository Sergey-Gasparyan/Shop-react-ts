import { Link } from "react-router-dom";
import "./FavouriteCard.scss";
import ToFavouriteButton from "../icons/ToFavouriteButton";
import ToCartButton from "../icons/ToCartButton";
import React from "react";

export const FavouriteCard = React.memo(({ product }) => {

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.img}
          alt={product.name}
          style={{ width: "250px", height: "280px" }}
        />
      </Link>
      <div className="card_description">
        <Link to={`/product/${product.id}`}>
          <div>
            <div>{product.name}</div>
            <div>Rating : {product.rating}</div>
            <h3>Price : {product.price}$</h3>
          </div>
        </Link>
        <div className="card-icon">
          <ToFavouriteButton product={product} />
          <ToCartButton product={product} />
        </div>
      </div>
    </div>
  );
})
