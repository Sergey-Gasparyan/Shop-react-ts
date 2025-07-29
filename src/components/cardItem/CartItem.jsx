import { useDispatch } from "react-redux";
import { deleteCart, updateCarts } from "../../redux/slices/cartSlice";
import "./CartItem.scss";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const CartItem = ({ product}) => {
  const dispatch = useDispatch();

  function handleChangePlusQuantity() {
    const newProduct = {
      ...product,
      quantity: product.quantity + 1,
    };
    dispatch(updateCarts(newProduct));
  }

  function handleChangeMinusQuantity() {
    const newProduct = {
      ...product,
      quantity: product.quantity - 1,
    };
    if (product.quantity > 1) dispatch(updateCarts(newProduct));
  }

  return (
    <div className="cartItemBlock">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.img}
          alt={product.name}
          style={{ width: "150px", height: "auto" }}
        />
      </Link>
      <Link to={`/product/${product.id}`}>
        <div className="cartItem_name">
          <h3>{product.brand}</h3>
          <div>{product.name}</div>
        </div>
      </Link>
      <div className="cartItem_PriceBlock">
        <div className="cartItem_quantity">
          <button onClick={handleChangePlusQuantity}>+</button>
          <span>{product.quantity}</span>
          <button
            disabled={product.quantity <= 1}
            onClick={handleChangeMinusQuantity}
          >
            -
          </button>
        </div>
        <h3 className="cartItem_price">
          Price : {product.price * product.quantity}$
        </h3>
        <Button
          onClick={() => dispatch(deleteCart(product.id))}
          style={{ fontSize: "22px" }}
          icon={<DeleteOutlined style={{ fontSize: "25px" }} />}
          danger
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
