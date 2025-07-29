import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCarts, deleteCart } from "../../redux/slices/cartSlice";

const ToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((store) => store.carts.carts)

  function onClickCarts() {
    if (!cartProducts.some((el) => el.id === product.id)) {
      dispatch(addToCarts(product));
    } else {
      dispatch(deleteCart(product.id));
    }
  }

  return (
    <div onClick={onClickCarts}>
      <ShoppingCartOutlined style={{ fontSize: "40px", color: cartProducts.some((cart) => cart.id === product.id) ? "green" : "black"}} />
    </div>
  );
};

export default ToCartButton;
