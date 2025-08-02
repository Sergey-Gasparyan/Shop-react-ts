
import { Link } from "react-router-dom";
import "./Header.scss";
import { debounce } from "lodash";
import { Button, Input, Modal } from "antd";
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../redux/reduxHooks";
import { ISearchParamsProps } from "../../types/types";
import { useState } from "react";
import Login from "../login/Login.tsx";

interface IHeaderProps extends ISearchParamsProps {
  hanndleNavBar: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  handleChangeFilters,
  hanndleNavBar,
  searchParams,
}) => {
  const debounceHandler = debounce(
    (e:React.ChangeEvent<HTMLInputElement>) => handleChangeFilters("q", e.target.value),
    800
  );

  const [openModal,setOpenModal] = useState(false)

  const cartsProduct = useAppSelector((store) => store.carts.carts);
  const favouriteProducts = useAppSelector(
    (store) => store.favourites.favourites
  );

  function closeModal () {
    setOpenModal(false)
  }

  const productCartQuantity = cartsProduct.reduce(
    (acc, el) => acc + el.quantity,
    0
  );

  const productFavouriteQuantity = favouriteProducts.reduce(
    (acc, el) => acc + el.quantity,
    0
  );

  const filters =
    searchParams.get("price_gte") ||
    searchParams.get("category") ||
    searchParams.get("price_lte");

  return (
    <header className="header">
      <div>
        <Link to="/" className="header-logo">
          Sals
        </Link>
      </div>

      <Button size='large' type="text" shape="circle" onClick={() => setOpenModal(true)} icon={<UserOutlined style={{fontSize:"38px",color:"white"}}/>} />
      <div className="menuIconWrapper cursor-pointer" onClick={hanndleNavBar}>
        <MenuOutlined className="menu-icon" />
        {filters && <div className="circle"></div>}
      </div>
      <Input
        onChange={debounceHandler}
        defaultValue={searchParams.get("q") || ""}
        type="text"
        placeholder="Filter by name ..."
      />
      <div className="header-nav">
        <div className="icon-wrapper">
          <Link to="/cart" className="icon-link">
            <ShoppingCartOutlined className="cart-icon" />
          </Link>
          {productCartQuantity !== 0 && (
            <div className="cart-quantity">{productCartQuantity}</div>
          )}
        </div>
        <div className="icon-wrapper favourite-wrapper">
          <Link to="/favourites" className="icon-link">
            <HeartOutlined className="heart-icon" />
          </Link>
          {productFavouriteQuantity !== 0 && (
            <div className="favourite-quantity">
              {productFavouriteQuantity}
            </div>
          )}
          <Modal destroyOnHidden={true} footer={null} onCancel={closeModal} open={openModal}><Login/></Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
