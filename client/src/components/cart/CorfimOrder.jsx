import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../ui/MetaData/MetaData";
import "./Styles/confirmOrder.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader/Loader";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const shippingCharges = subTotal > 1000 ? 0 : 99;
  const iva = subTotal * 0.21;
  const totalFinalPrice = subTotal + iva + shippingCharges;
  const address = `${shippingInfo.address} , ${shippingInfo.city} ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country}`;

  function proceedToPayment() {
    const data = {
      subTotal,
      shippingCharges,
      iva,
      totalFinalPrice,
    };
    // session storage allowd save data untill  browser tab is opend
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Confirm Order" />
          <CheckoutSteps activeStep={1} />
          <div className="confirmOrderPage">
            {/* left container  */}
            <div>
              {/* Shoping area container  */}
              <div className="confirmshippingArea">
                <Typography>Informacion de envio</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Nombre:</p>
                    <span>{user.name}</span>
                  </div>

                  <div>
                    <p>Telefono:</p>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>

                  <div>
                    <p>Direccion:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>

              {/* confirm cartItem  */}

              <div className="confirmCartItems">
                <Typography>Artículos de su carrito:</Typography>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.productId}>
                        <img src={item.image} alt="product" />
                        <Link to={`/product/${item.productId}`}>
                          {" "}
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X ${item.price}={" "}
                          <b>${item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Order Summery --> right side */}

            <div>
              <div className="orderSummary">
                <Typography>Resumen del pedido</Typography>

                <div>
                  <div>
                    <p>Subtotal : </p>
                    <span>${subTotal}</span>
                  </div>

                  <div>
                    <p>Gastos de envío:</p>
                    <span>${shippingCharges}</span>
                  </div>

                  <div>
                    <p>IVA :</p>
                    <span>${iva}</span>
                  </div>
                </div>
                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>${totalFinalPrice}</span>
                </div>
                <button onClick={proceedToPayment}>Proceder al pago</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConfirmOrder;
