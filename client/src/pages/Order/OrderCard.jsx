import React, { useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../store/reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import DialogBox from "../Products/DialogBox";
import * as OrderCardStyles from "./Styles/OrderCardStyles";
import { formatCreatedAt } from "../../utils/dateFormatter";

const OrderCard = ({ item, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 999px)");
  const { shippingInfo, orderItems } = item;
  const userCreatedAt = user ? formatCreatedAt(user) : ""; //Para saber la fecha de creacion del usuario

  const addToCartHandler = (id, qty = 0) => {
    dispatch(addToCart(id, qty));
    toast.success("Artículo agregado al carrito");
    navigate("/cart");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <OrderCardStyles.Root>
      {orderItems.map((product) => (
        <OrderCardStyles.OrderCardContainer key={product.productId}>
          <OrderCardStyles.FirstBlock>
            <OrderCardStyles.LeftSide>
              <OrderCardStyles.OrderPlacedTypography variant="subtitle1">
                PEDIDO REALIZADO
              </OrderCardStyles.OrderPlacedTypography>
              <OrderCardStyles.OrderDateTypography
                variant="body2"
                color="#141414"
              >
                {userCreatedAt}
              </OrderCardStyles.OrderDateTypography>
              <OrderCardStyles.OrderIdTypography variant="body2">
                ID - DEL PEDIDO: #{item._id}
              </OrderCardStyles.OrderIdTypography>
            </OrderCardStyles.LeftSide>

            {!isSmallScreen && (
              <OrderCardStyles.RightSide>
                <OrderCardStyles.TotalPriceTypography variant="subtitle1">
                  Total:
                </OrderCardStyles.TotalPriceTypography>
                <Typography variant="body2" color="141414">
                  <strong> $</strong>
                  {product.price * product.quantity}
                </Typography>
              </OrderCardStyles.RightSide>
            )}
          </OrderCardStyles.FirstBlock>

          <OrderCardStyles.SecondBlock>
            <OrderCardStyles.SecondBlockLeft>
              <OrderCardStyles.ProductDetailsContainer>
                <div style={{ width: "25%" }}>
                  <OrderCardStyles.ProductImage
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div>
                  <OrderCardStyles.ProductNameTypography variant="subtitle1">
                    {product.name}
                  </OrderCardStyles.ProductNameTypography>
                  <OrderCardStyles.ProductQtyTypography variant="body2">
                    <strong>CANTIDAD:</strong> {product.quantity}
                  </OrderCardStyles.ProductQtyTypography>
                  <OrderCardStyles.DeliveryStatusTypography variant="body2">
                    <strong>Estado de entrega:</strong>{" "}
                    <span
                      style={{
                        color:
                          item.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {item.orderStatus}
                    </span>
                  </OrderCardStyles.DeliveryStatusTypography>
                  <OrderCardStyles.ButtonsContainer>
                    <OrderCardStyles.BuyAgainButton
                      variant="outlined"
                      onClick={() => addToCartHandler(product.productId, 1)}
                    >
                      <OrderCardStyles.StyledReplayIcon />
                      Comprar de nuevo
                    </OrderCardStyles.BuyAgainButton>
                    <OrderCardStyles.StyledButton
                      variant="outlined"
                      onClick={() => navigate(`/product/${product.productId}`)}
                    >
                      Ver artículo
                    </OrderCardStyles.StyledButton>
                  </OrderCardStyles.ButtonsContainer>
                </div>
              </OrderCardStyles.ProductDetailsContainer>
              <OrderCardStyles.StyledDivider />
              <div style={{ padding: "1rem" }}>
                <OrderCardStyles.ReviewButton
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  <OrderCardStyles.StyledEditIcon />
                  Escribe una reseña de un producto
                </OrderCardStyles.ReviewButton>

                <DialogBox
                  open={open}
                  handleClose={handleClose}
                  id={product.productId}
                />
              </div>
            </OrderCardStyles.SecondBlockLeft>

            {!isSmallScreen && (
              <OrderCardStyles.SecondBlockRight>
                <OrderCardStyles.LeftSide2>
                  <OrderCardStyles.ShipToTypography variant="h6">
                    {user.name}
                  </OrderCardStyles.ShipToTypography>
                  <OrderCardStyles.AddressTypography variant="subtitle1">
                    Dirección de entrega :
                  </OrderCardStyles.AddressTypography>
                  <OrderCardStyles.AddressTextTypography variant="body2">
                    {shippingInfo.address}
                  </OrderCardStyles.AddressTextTypography>
                  <OrderCardStyles.AddressTextTypography variant="body2">
                    {shippingInfo.city}, {shippingInfo.state},{" "}
                    {shippingInfo.country} - {shippingInfo.pinCode}
                  </OrderCardStyles.AddressTextTypography>
                  <OrderCardStyles.AddressTextTypography variant="body2">
                    Telefono: {shippingInfo.phoneNo}
                  </OrderCardStyles.AddressTextTypography>
                </OrderCardStyles.LeftSide2>
              </OrderCardStyles.SecondBlockRight>
            )}
          </OrderCardStyles.SecondBlock>
        </OrderCardStyles.OrderCardContainer>
      ))}
    </OrderCardStyles.Root>
  );
};

export default OrderCard;
