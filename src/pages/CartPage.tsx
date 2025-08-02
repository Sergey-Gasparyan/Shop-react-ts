import { useEffect } from "react";
import CartItem from "../components/cardItem/CartItem";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { fetchCarts } from "../redux/slices/cartSlice";

const CartPage= () => {
  const cartsProduct = useAppSelector((store) => store.carts.carts);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCarts())
  },[])
  
  const totalPrice = cartsProduct.reduce(
    (acc, el) => acc + el.quantity * el.price,
    0
  );
  const productCount = cartsProduct.reduce((acc, el) => acc + el.quantity, 0);

  if (cartsProduct.length === 0) {
    return (
      <h1 className="empty">
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