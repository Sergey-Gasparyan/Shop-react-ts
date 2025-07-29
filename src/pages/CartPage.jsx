import {useSelector } from "react-redux";
import CartItem from "../components/cardItem/CartItem";

const CartPage = () => {
  const cartsProduct = useSelector((store) => store.carts.carts);
  const totalPrice = cartsProduct.reduce(
    (acc, el) => acc + el.quantity * el.price,
    0
  );
  const productCount = cartsProduct.reduce((acc, el) => acc + el.quantity, 0);

  if (cartsProduct.length === 0) {
    return (
      <h1 style={{ fontSize: "30px", textAlign: "center", marginTop: "20px" }}>
        You Havn't Carts :(
      </h1>
    );
  }

  return (
    <div className="">
      {cartsProduct.map((cartProduct) => (
        <CartItem key={cartProduct.id} product={cartProduct}></CartItem>
      ))}
      <div className="totalAmount">
        <h3>Total Price : {totalPrice}$</h3>
        <div>Quantity {productCount}</div>
      </div>
    </div>
  );
};

export default CartPage;
