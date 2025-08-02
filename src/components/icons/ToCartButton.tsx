import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCarts, deleteCart } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { IProduct } from "../../types/types";

const ToCartButton:React.FC<{product : IProduct}> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((store) => store.carts.carts);

  function onClickCarts() {
    if (!cartProducts.some((el) => el.id === product.id)) {
      dispatch(addToCarts(product));
    } else {
      dispatch(deleteCart('' + product.id));
    }
  }

  return (
    <div onClick={onClickCarts}>
      <ShoppingCartOutlined
        style={{
          fontSize: "40px",
          color: cartProducts.some((cart) => cart.id === product.id)
            ? "green"
            : "black",
        }}
      />
    </div>
  );
};

export default ToCartButton;
