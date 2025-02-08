import React from "react";
import * as OrderSuccessStyles from "./Styles/OrderSuccessStyles";

function OrderSuccess() {
  return (
    <OrderSuccessStyles.OrderSuccessContainer>
      <OrderSuccessStyles.SuccessIcon />
      <OrderSuccessStyles.SuccessText variant="h4">
        ¡Felicidades!
        <br />
        Su pedido se ha realizado con éxito
      </OrderSuccessStyles.SuccessText>
      <OrderSuccessStyles.StyledLink to="/orders">
        <OrderSuccessStyles.ViewOrdersButton variant="contained">
          Ver pedidos
        </OrderSuccessStyles.ViewOrdersButton>
      </OrderSuccessStyles.StyledLink>
    </OrderSuccessStyles.OrderSuccessContainer>
  );
}

export default OrderSuccess;
