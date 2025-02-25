import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../ui/MetaData/MetaData";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderDetailsSection from "./OrderDetails";
import DummyCard from "./DummyCard";
import { clearErrors, createOrder } from "../../store/reducers/orderSlice";
import CheckoutSteps from "./CheckoutSteps";
import {
  initMercadoPago,
  CardNumber,
  ExpirationDate,
  SecurityCode,
  createCardToken,
} from "@mercadopago/sdk-react";
import "./Styles/cart.css";
import { Typography, TextField, Grid, Link } from "@mui/material";
import { CardMembership, Payment, Lock } from "@mui/icons-material";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../../utils/DisplayMoney";
import * as PaymentComponentStyles from "./Styles/PaymentComponentStyles";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { error } = useSelector((state) => state.newOrder);
  const [isFocused, setIsFocused] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showDummyCard, setShowDummyCard] = useState(false);

  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false);
  };

  const handleFocus = (e) => {
    setIsFocused(e.target.value !== "");
  };

  const handleRadioChange = () => {
    setShowDummyCard(!showDummyCard);
  };

  const handleCloseDummyCard = () => {
    setShowDummyCard(false);
  };

  const address = `${shippingInfo.address} , ${shippingInfo.city} ${
    shippingInfo.state
  } , ${shippingInfo.pinCode} , ${shippingInfo.country || "Argentina"}`;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
  };

  const paymentData = {
    amount: Math.round(totalFinalPrice * 100),
  };

  useEffect(() => {
    initMercadoPago({ publicKey: process.env.REACT_APP_MP_PUBLIC_KEY });
  }, []);

  async function paymentSubmitHandler(e) {
    e.preventDefault();
    if (nameOnCard === "") {
      toast.error("Por favor, introduzca el nombre en la tarjeta");
      return;
    }

    try {
      const cardToken = await createCardToken({
        cardholderName: nameOnCard,
        identificationType: "DNI", // Tipo de documento
        identificationNumber: "12345678", // Número de documento
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        { token: cardToken.id, ...paymentData },
        config
      );

      if (data.status === "approved") {
        order.paymentInfo = {
          id: data.id,
          status: data.status,
        };
        toast.success(data.status);
        dispatch(createOrder(order));
        navigate("/success");
      } else {
        toast.error("Hay algún problema al procesar el pago.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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
      <PaymentComponentStyles.PaymentPage>
        <CheckoutSteps activeStep={2} />
        <MetaData title={"Payment"} />
        <PaymentComponentStyles.PaymentPageContainer>
          <PaymentComponentStyles.PaymentBox>
            <PaymentComponentStyles.PaymentHeading variant="h5" component="h1">
              Método de pago
            </PaymentComponentStyles.PaymentHeading>
            <PaymentComponentStyles.SecurePayment
              variant="subtitle2"
              gutterBottom
            >
              <PaymentComponentStyles.StyledAssuredWorkloadOutlinedIcon />
              Los pagos están encriptados con SSL para que su tarjeta de crédito
              y los datos de pago permanezcan seguros.
            </PaymentComponentStyles.SecurePayment>

            <PaymentComponentStyles.CardContainer>
              <PaymentComponentStyles.SubHeading variant="h6">
                Tarjeta de crédito{" "}
                <PaymentComponentStyles.StyledCreditCardIcon fontSize="medium" />
              </PaymentComponentStyles.SubHeading>
              <PaymentComponentStyles.CardDetails container spacing={2}>
                <Grid item xs={12}>
                  <PaymentComponentStyles.LabelText variant="subtitle2">
                    Número de tarjeta
                  </PaymentComponentStyles.LabelText>
                  <PaymentComponentStyles.CardNumberInput>
                    <CardMembership
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)",
                        color: "#00000080",
                        cursor: "pointer",
                      }}
                    />
                    <CardNumber
                      id="form-checkout__cardNumber"
                      placeholder="Card number"
                      as={PaymentComponentStyles.PaymentInput}
                    />
                  </PaymentComponentStyles.CardNumberInput>
                </Grid>
                <Grid item xs={12} container justifyContent="space-between">
                  <PaymentComponentStyles.Icons item>
                    <PaymentComponentStyles.StyledMasterCard />
                    <PaymentComponentStyles.StyledVisa />
                    <PaymentComponentStyles.StyledPaytm />
                  </PaymentComponentStyles.Icons>
                </Grid>
                <Grid item xs={6}>
                  <PaymentComponentStyles.LabelText variant="subtitle2">
                    FECHA DE EXPIRACION
                  </PaymentComponentStyles.LabelText>
                  <PaymentComponentStyles.ExpiryInput>
                    <Payment
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)",
                        color: "#00000080",
                        cursor: "pointer",
                      }}
                    />
                    <ExpirationDate
                      id="form-checkout__expirationDate"
                      placeholder="MM/YY"
                      as={PaymentComponentStyles.PaymentInput2}
                    />
                  </PaymentComponentStyles.ExpiryInput>
                </Grid>
                <Grid item xs={6}>
                  <PaymentComponentStyles.LabelText variant="subtitle2">
                    CVV/CVV
                  </PaymentComponentStyles.LabelText>
                  <PaymentComponentStyles.CvvInput>
                    <Lock
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)",
                        color: "#00000080",
                        cursor: "pointer",
                      }}
                    />
                    <SecurityCode
                      id="form-checkout__securityCode"
                      placeholder="Security code"
                      as={PaymentComponentStyles.PaymentInput2}
                    />
                  </PaymentComponentStyles.CvvInput>
                </Grid>
                <Grid item xs={12}>
                  <PaymentComponentStyles.LabelText variant="subtitle2">
                    NOMBRE EN LA TARJETA
                  </PaymentComponentStyles.LabelText>
                  <PaymentComponentStyles.OutlinedInput
                    id="form-checkout__cardholderName"
                    placeholder="John Doe"
                    variant="outlined"
                    fullWidth
                    value={nameOnCard}
                    required
                    onChange={handleNameOnCardChange}
                  />
                </Grid>
              </PaymentComponentStyles.CardDetails>
            </PaymentComponentStyles.CardContainer>

            <PaymentComponentStyles.CardSelection>
              <PaymentComponentStyles.StyledRadio
                value="dummyCard"
                checked={showDummyCard}
                onChange={handleRadioChange}
              />
              <PaymentComponentStyles.RadioText variant="subtitle2">
                Use dummy card
              </PaymentComponentStyles.RadioText>
              <PaymentComponentStyles.StyledCreditCardIcon fontSize="medium" />
              {showDummyCard && <DummyCard onClose={handleCloseDummyCard} />}
            </PaymentComponentStyles.CardSelection>
            <PaymentComponentStyles.TermsAndConditionsText variant="body2">
              Al hacer clic en "Realizar pedido", usted acepta nuestros{" "}
              <PaymentComponentStyles.PrivacyText href="#">
                Terminos & Condiciones
              </PaymentComponentStyles.PrivacyText>
            </PaymentComponentStyles.TermsAndConditionsText>
            <PaymentComponentStyles.PlaceOrderBtn
              variant="contained"
              fullWidth
              // disabled={isDisable}
              style={{ marginTop: "3rem" }}
              onClick={paymentSubmitHandler}
            >
              Realizar pedido
            </PaymentComponentStyles.PlaceOrderBtn>
          </PaymentComponentStyles.PaymentBox>
          <PaymentComponentStyles.PaymentAmount>
            <PaymentComponentStyles.OrderSummary>
              <h4>
                Resumen del pedido   ({cartItems.length}{" "}
                {cartItems.length > 1 ? "items" : "item"} )
              </h4>
              <div className="order_summary_details">
                <PaymentComponentStyles.OrderSummaryItem>
                  <span>Precio original</span>
                  {/* ORIGINAL PRICE TOATAL */}
                  <p>{totalPrice}</p>
                </PaymentComponentStyles.OrderSummaryItem>

                <PaymentComponentStyles.OrderSummaryItem>
                  <span>Descuento</span>
                  <p>
                    <del>{totalDiscount}</del>
                  </p>
                </PaymentComponentStyles.OrderSummaryItem>

                <PaymentComponentStyles.OrderSummaryItem>
                  <span>Envio</span>
                  <p>
                    <b>Gratis</b>
                  </p>
                </PaymentComponentStyles.OrderSummaryItem>

                <PaymentComponentStyles.SeparatorCart />
                <PaymentComponentStyles.TotalPrice>
                  <div>
                    <h4>Precio Total</h4>

                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "-10px",
                        color: "#414141",
                      }}
                    >
                      (Incluye todos los impuestos)
                    </p>
                  </div>
                  <p>
                    <b>{final}</b>
                  </p>
                </PaymentComponentStyles.TotalPrice>
              </div>
            </PaymentComponentStyles.OrderSummary>

            <PaymentComponentStyles.SeparatorCart />

            <PaymentComponentStyles.CouponBoxWrapper>
              <PaymentComponentStyles.CouponBoxContent isFocused={isFocused}>
                <TextField
                  label="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={() => setIsFocused(false)}
                  error={!isValid}
                  helperText={!isValid && "Invalid coupon code"}
                  variant="outlined"
                  size="small"
                  style={{
                    width: "200px",
                    marginRight: "1rem",
                  }}
                />

                <PaymentComponentStyles.CouponBoxApplyBtn
                  variant="contained"
                  color="primary"
                  onClick={handleApplyCoupon}
                >
                  Aplicar
                </PaymentComponentStyles.CouponBoxApplyBtn>
              </PaymentComponentStyles.CouponBoxContent>
            </PaymentComponentStyles.CouponBoxWrapper>

            <PaymentComponentStyles.PaymentLogoImg>
              <PaymentComponentStyles.PaymentImg
                src={require("../../assets/cart/cart_img.png")}
                alt="payemnt-icons"
              />
            </PaymentComponentStyles.PaymentLogoImg>
            <PaymentComponentStyles.OrderDetails>
              <PaymentComponentStyles.OrderSubHeading variant="h6">
                DETALLES DEL PEDIDO
              </PaymentComponentStyles.OrderSubHeading>
              {cartItems &&
                cartItems.map((item, idx) => (
                  <Link
                    to={`/product/${item.productId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    key={idx}
                  >
                    <OrderDetailsSection
                      item={item}
                      totalDiscount={totalDiscount}
                      totalPrice={totalPrice}
                    />
                  </Link>
                ))}
            </PaymentComponentStyles.OrderDetails>
            <PaymentComponentStyles.BoldDivider />
            <PaymentComponentStyles.ShippingDetails>
              <PaymentComponentStyles.OrderSubHeading variant="h6">
                DIRECCIÓN DE ENVIO
              </PaymentComponentStyles.OrderSubHeading>

              <PaymentComponentStyles.ShippingAddress>
                <PaymentComponentStyles.ShippingAddressDetails>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {user.name && user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {address}
                  </Typography>
                </PaymentComponentStyles.ShippingAddressDetails>
                <PaymentComponentStyles.ShippingAddressEdit>
                  <PaymentComponentStyles.StyledEditIcon
                    onClick={() => {
                      navigate("/shipping");
                    }}
                  />
                </PaymentComponentStyles.ShippingAddressEdit>
              </PaymentComponentStyles.ShippingAddress>
              <Typography
                variant="subtitle2"
                style={{
                  fontWeight: 400,
                  marginTop: "-5px",
                  fontSize: "16px",
                }}
              >
                {shippingInfo.phoneNo},
              </Typography>

              <Typography
                variant="subtitle2"
                style={{ fontWeight: 400, fontSize: "16px" }}
              >
                {user.email}
              </Typography>
            </PaymentComponentStyles.ShippingDetails>

            <PaymentComponentStyles.ShippingDetails>
              <PaymentComponentStyles.OrderSubHeading
                variant="h6"
                style={{ marginTop: "5px" }}
              >
                DATOS DE FACTURACIÓN
              </PaymentComponentStyles.OrderSubHeading>

              <PaymentComponentStyles.ShippingAddress>
                <PaymentComponentStyles.ShippingAddressDetails>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontSize: "16px", fontWeight: 400 }}
                  >
                    {address}
                  </Typography>
                </PaymentComponentStyles.ShippingAddressDetails>
                <PaymentComponentStyles.ShippingAddressEdit>
                  <PaymentComponentStyles.StyledEditIcon
                    onClick={() => {
                      navigate("/shipping");
                    }}
                  />
                </PaymentComponentStyles.ShippingAddressEdit>
              </PaymentComponentStyles.ShippingAddress>
              <Typography
                variant="subtitle2"
                style={{
                  fontWeight: 400,
                  marginTop: "-5px",
                  fontSize: "16px",
                }}
              >
                {shippingInfo.phoneNo},
              </Typography>

              <Typography
                variant="subtitle2"
                style={{ fontWeight: 400, fontSize: "16px" }}
              >
                {user.email}
              </Typography>
            </PaymentComponentStyles.ShippingDetails>
          </PaymentComponentStyles.PaymentAmount>
        </PaymentComponentStyles.PaymentPageContainer>
      </PaymentComponentStyles.PaymentPage>
    </>
  );
};

export default PaymentComponent;
