import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {
  addToFavourites,
  deleteFavourites,
} from "../../redux/slices/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import "./ToFavouriteButton.css"
import { IProduct } from "../../types/types";

const ToFavouriteButton:React.FC<{product:IProduct}> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favouriteProducts = useAppSelector(
    (store) => store.favourites.favourites
  );

  const isFavourite = favouriteProducts.some((el) => el.id === product.id);

  function onClickFavourites(product:IProduct) {
    if (!isFavourite) {
      dispatch(addToFavourites(product));
    } else {
      dispatch(deleteFavourites('' + product.id));
    }
  }

  return (
    <div
      onClick={() => onClickFavourites(product)}
      className="cursor-pointer"
    >
      {isFavourite ? (
        <HeartFilled style={{ fontSize: "40px", color: "red" }} />
      ) : (
        <HeartOutlined style={{ fontSize: "40px", color: "black" }} />
      )}
    </div>
  );
};
export default ToFavouriteButton;
