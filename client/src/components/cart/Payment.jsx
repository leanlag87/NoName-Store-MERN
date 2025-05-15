import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../store/reducers/orderSlice";
import instance from "../../config"; //Instancia configurada de axios
import { API_ENDPOINTS } from "../../config/apiEndpoints";
import MetaData from "../ui/MetaData/MetaData";
import { toast } from "react-toastify";
import OrderDetailsSection from "./OrderDetails";
import CheckoutSteps from "./CheckoutSteps";
import DummyCard from "./DummyCard";
import { Typography, TextField, Link } from "@mui/material";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../../utils/DisplayMoney";
import "./Styles/cart.css";
import * as PaymentComponentStyles from "./Styles/PaymentComponentStyles";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);
  const [isFocused, setIsFocused] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showDummyCard, setShowDummyCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  const handleApplyCoupon = () => {
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

  const DEFAULT_IMAGE = "https://via.placeholder.com/150?text=No+Image";

  const order = {
    shippingInfo,
    orderItems: cartItems.map((item) => {
      // Intentar obtener una imagen válida de múltiples fuentes
      let imageUrl = "";

      if (Array.isArray(item.image) && item.image.length > 0) {
        imageUrl = item.image[0];
      } else if (typeof item.image === "string" && item.image) {
        imageUrl = item.image;
      } else if (
        item.product &&
        Array.isArray(item.product.images) &&
        item.product.images.length > 0
      ) {
        imageUrl = item.product.images[0];
      } else {
        imageUrl = DEFAULT_IMAGE;
      }

      // Para depuración
      console.log("Original product:", item.product);
      const productId =
        typeof item.product === "object" ? item.product._id : item.product;
      console.log("Extracted product ID:", productId);

      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: imageUrl,
        product: productId,
      };
    }),

    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
    // Info de pago temporal que se actualizará después del pago real
    paymentInfo: {
      id: "pending_" + Date.now(), // ID temporal único
      status: "pending", // Estado inicial
      paymentMethod: "mercadopago", // Método de pago que estamos usando
    },
  };

  // función para el flujo de CheckoutPro
  const handleCheckoutPro = async () => {
    try {
      setLoading(true);
      console.log("Enviando orden:", JSON.stringify(order, null, 2));

      // 1. Crear la orden
      const orderResponse = await instance.post(
        API_ENDPOINTS.ORDERS.NEW,
        order
      );

      if (!orderResponse.data.success) {
        toast.error("Error al crear la orden");
        setLoading(false);
        return;
      }

      const orderId = orderResponse.data.order._id;

      // 2. Obtener la preferencia de pago
      const { data } = await instance.post(API_ENDPOINTS.PAYMENT.BASE, {
        orderId,
      });

      // 3. Redirigir al usuario a la URL de pago de MercadoPago
      window.location.href = data.init_point;
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
      console.error("Error en el proceso de checkout:", error);
    }
  };

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
        <MetaData title={"Pago"} />
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
                Pago seguro con MercadoPago{" "}
                <PaymentComponentStyles.StyledCreditCardIcon fontSize="medium" />
              </PaymentComponentStyles.SubHeading>
              {/* Botón para iniciar el flujo de CheckoutPro */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                <img
                  src={require("../../assets/mercado-pago.jpg")}
                  alt="MercadoPago"
                  style={{ width: "200px", marginBottom: "20px" }}
                />
                <PaymentComponentStyles.PlaceOrderBtn
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  onClick={handleCheckoutPro}
                >
                  {loading ? "Procesando..." : "Pagar con MercadoPago"}
                </PaymentComponentStyles.PlaceOrderBtn>
              </div>
            </PaymentComponentStyles.CardContainer>
            {/*DummyCard */}
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
              Al hacer clic en "PROCEDER AL PAGO", usted acepta nuestros{" "}
              <PaymentComponentStyles.PrivacyText href="#">
                Terminos & Condiciones
              </PaymentComponentStyles.PrivacyText>
            </PaymentComponentStyles.TermsAndConditionsText>
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
                  label="Ingrese el código de cupón"
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
                      //paymentStatus={item.paymentInfo.status}
                      // Aquí puedes pasar el ID del producto si es necesario
                      productId={item.productId}
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
                    {user?.name ||
                      `${shippingInfo.firstName} ${shippingInfo.lastName}`}
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
                {user?.email || shippingInfo.email || ""}
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
                    {user?.name ||
                      `${shippingInfo.firstName} ${shippingInfo.lastName}`}
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
                {user?.email || shippingInfo.email || ""}
              </Typography>
            </PaymentComponentStyles.ShippingDetails>
          </PaymentComponentStyles.PaymentAmount>
        </PaymentComponentStyles.PaymentPageContainer>
      </PaymentComponentStyles.PaymentPage>
    </>
  );
};

export default PaymentComponent;
