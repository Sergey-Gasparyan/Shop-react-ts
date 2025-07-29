import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../redux/slices/productSlice";
import ToCartButton from "../components/icons/ToCartButton";
import ToFavouriteButton from "../components/icons/ToFavouriteButton";
import "./Product.scss";
import Comments from "../components/comments/Comments";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, productLoading } = useSelector((store) => store.product);
  
  useEffect(() => {
    if(id) dispatch(fetchProduct(id));
  }, [id]);

  if (productLoading) {
    return (
      <h1 style={{ textAlign: "center", fontSize: "25px", marginTop: "20px" }}>
        Loading...
      </h1>
    );
  }

  return (
    <>
      <div className="product_PageBlock">
        <img
          src={product.img}
          alt={product.name}
          style={{ width: "400px", height: "auto" }}
        />
        <div className="product_page_content">
          <div>
            <div>{product.name}</div>
            <h3>{product.brand}</h3>
            <div>Rating : {product.rating}</div>
            <h3>Price : {product.price}$</h3>
            <p style={{ fontSize: "30px", marginTop: "50px" }}>
              {product.description}
            </p>
          </div>

          <div className="icons">
            <ToCartButton product={product} />
            <ToFavouriteButton product={product} />
          </div>
        </div>
      </div>
      <Comments productId={product.id}/>
    </>
  );
};

export default Product;
