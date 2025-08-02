import { useParams } from "react-router-dom";
import ToCartButton from "../components/icons/ToCartButton";
import ToFavouriteButton from "../components/icons/ToFavouriteButton";
import "./Product.scss";
import Comments from "../components/comments/Comments";
import { useGetProductQuery } from "../queryies/brandApi";

const Product = () => {
  const { id } = useParams();

  const {data : product , isLoading : productLoading , error} = useGetProductQuery(id! , {skip: !id})


  if (productLoading) {
    return (
      <h1 className="loading">
        Loading...
      </h1>
    );
  }

  if(error) return <h2 className="error">Error</h2>

return (
  product && (
    <>
      <div className="product_PageBlock">
        <img
          src={product.img}
          alt={product.name}
        />
        <div className="product_page_content">
          <div>
            <div>{product.name}</div>
            <h3>{product.brand}</h3>
            <div>Rating : {product.rating}</div>
            <h3>Price : {product.price}$</h3>
            <p>{product.description}</p>
          </div>

          <div className="icons">
            <ToCartButton product={product} />
            <ToFavouriteButton product={product} />
          </div>
        </div>
      </div>
      <Comments productId={product?.id} />
    </>
  )
);
};

export default Product;
