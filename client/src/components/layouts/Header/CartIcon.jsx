import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import "../Styles/CartIcon.css";

const CartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemsCount = cartItems.length;

  return (
    <div className="cartIconWrapper">
      <span className="cartIcon">
        <ShoppingCartIcon className="icon" />
        {cartItemsCount > 0 && (
          <span className="cartItemCount">{cartItemsCount}</span>
        )}
      </span>
    </div>
  );
};

export default CartIcon;
