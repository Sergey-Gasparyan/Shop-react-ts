import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, deleteFavourites } from '../../redux/slices/favouriteSlice';

const ToFavouriteButton = ({ product }) => {
  const dispatch = useDispatch();
  const favouriteProducts = useSelector((store) => store.favourites.favourites);

  const isFavourite = favouriteProducts.some((el) => el.id === product.id);

  function onClickFavourites(product) {
    if (!isFavourite) {
      dispatch(addToFavourites(product));
    } else {
      dispatch(deleteFavourites(product.id));
    }
  }

  return (
    <div onClick={() => onClickFavourites(product)} style={{ cursor: 'pointer' }}>
      {isFavourite ? (
        <HeartFilled style={{ fontSize: '40px', color: 'red' }} />
      ) : (
        <HeartOutlined style={{ fontSize: '40px', color: 'black' }} />
      )}
    </div>
  );
};
export default ToFavouriteButton