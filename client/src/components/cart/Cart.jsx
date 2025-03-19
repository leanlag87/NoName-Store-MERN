import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Styles/cart.css";
import {
  addToCart,
  getCart,
  removeItemFromCart,
} from "../../store/reducers/cartSlice";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MetaData from "../ui/MetaData/MetaData";
import CartItem from "./CartItem";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../../utils/DisplayMoney";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAutehnticated } = useSelector((state) => state.user);
  const [couponCode, setCouponCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  //Cargar el carrito cuando se monte el componente
  useEffect(() => {
    if (!isAutehnticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAutehnticated]);

  // Añadir este log para depurar
  useEffect(() => {
    console.log("Estructura de cartItems:", JSON.stringify(cartItems, null, 2));
  }, [cartItems]);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    } else {
      console.log(
        "Incrementando producto con ID:",
        id,
        "Nueva cantidad:",
        newQty
      );
      // Verificar que id es válido antes de enviar
      if (!id) {
        console.error("Error: ID de producto inválido");
        return;
      }

      dispatch(addToCart({ id, quantity: newQty }));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }

    console.log(
      "Decrementando producto con ID:",
      id,
      "Nueva cantidad:",
      newQty
    );

    // Verificar que id es válido antes de enviar
    if (!id) {
      console.error("Error: ID de producto inválido");
      return;
    }

    dispatch(addToCart({ id, quantity: newQty }));
  };

  const handleApplyCoupon = () => {
    setIsValid(false);
  };

  const handleFocus = (e) => {
    setIsFocused(e.target.value !== "");
  };

  const deleteCartItems = (id) => {
    console.log("Eliminando producto con ID:", id);
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  // calcular el precio total
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let discountedPrice = generateDiscountedPrice(totalPrice);
  let totalDiscount = totalPrice - discountedPrice;
  let final = totalPrice - totalDiscount;
  final = displayMoney(final);
  totalDiscount = displayMoney(totalDiscount);
  totalPrice = displayMoney(totalPrice);

  return (
    <>
      <div className="cartPage">
        <MetaData title="Tu carrito" />
        <div className="cart_HeaderTop">
          <div className="headerLeft">
            <Typography variant="h5" component="h1" className="cartHeading">
              Carrito de compra
            </Typography>
            <Typography variant="body2" className="cartText3">
              TOTAL ({cartItems.length} item) <b>{final}</b>
            </Typography>
          </div>
          <Typography
            variant="body2"
            className="cartText2"
            onClick={() => navigate("/products")}
          >
            Seguir comprando
          </Typography>
        </div>

        <div className="separator_cart2"></div>

        {cartItems.length === 0 ? (
          <div className="emptyCartContainer">
            <RemoveShoppingCartIcon className="cartIcon" />

            <Typography variant="h5" component="h1" className="cartHeading">
              Su carrito de compras está vacío
            </Typography>
            <Typography variant="body" className="cartText">
              No hay nada que ver aquí.
            </Typography>
            <Typography variant="body" className="cartText">
              ¡Vamos de compras!
            </Typography>

            <Button component={Link} to="/products" className="shopNowButton">
              Comprar ahora
            </Button>
          </div>
        ) : (
          <>
            <div className="cart_content_wrapper">
              <div className="cart_left_container">
                {cartItems &&
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CartItem
                        item={item}
                        quantity={item.quantity}
                        deleteCartItems={deleteCartItems}
                        decreaseQuantity={decreaseQuantity}
                        increaseQuantity={increaseQuantity}
                        length={cartItems.length}
                        id={
                          typeof item.product === "object"
                            ? item.product._id
                            : item.product
                        }
                      />
                    </div>
                  ))}
              </div>

              <div className="separator_cart3"></div>
              <div className="cart_right_container">
                <div className="order_summary">
                  <h4>
                    Resumen del pedido &nbsp; ( {cartItems.length}{" "}
                    {cartItems.length > 1 ? "items" : "item"} )
                  </h4>
                  <div className="order_summary_details">
                    <div className="price order_Summary_Item">
                      <span>Precio original</span>
                      {/* ORIGINAL PRICE TOATAL */}
                      <p>{totalPrice}</p>
                    </div>

                    <div className="discount order_Summary_Item">
                      <span>Descuento</span>
                      <p>
                        <del>{totalDiscount}</del>
                      </p>
                    </div>

                    <div className="delivery order_Summary_Item">
                      <span>Envio</span>
                      <p>
                        <b>Gratis</b>
                      </p>
                    </div>

                    <div className="separator_cart"></div>
                    <div className="total_price order_Summary_Item">
                      <div>
                        <h4>Precio Total</h4>

                        <p
                          style={{
                            fontSize: "14px",
                            marginTop: "-10px",
                            color: "#414141",
                          }}
                        >
                          (Incluido todos los impuestos)
                        </p>
                      </div>
                      <p>
                        <b>{final}</b>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="separator"></div>

                <div className="coupon-box-wrapper">
                  <div
                    className={`coupon-box-content ${
                      isFocused ? "focused" : ""
                    }`}
                  >
                    <TextField
                      label="Ingrese el código de cupón"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onFocus={handleFocus}
                      onBlur={() => setIsFocused(false)}
                      error={!isValid}
                      helperText={!isValid && "código de cupón no válido"}
                      variant="outlined"
                      size="small"
                      style={{ width: "200px", marginRight: "1rem" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className="coupon-box-apply-btn"
                      onClick={handleApplyCoupon}
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>

                <Button
                  variant="contained"
                  className="btn-custom"
                  onClick={checkoutHandler}
                >
                  Verificar
                </Button>

                <div className="paymentLogoImg">
                  <img
                    src={require("../../assets/cart/cart_img.png")}
                    alt="payemnt-icons"
                    className="paymentImg"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
