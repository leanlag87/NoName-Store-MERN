import React from "react";
import * as OrderDetailsSectionStyles from "./Styles/OrderDetailsSectionStyles";

const OrderDetailsSection = ({ item, totalDiscount, totalPrice }) => {
  return (
    <OrderDetailsSectionStyles.RootPayment>
      <OrderDetailsSectionStyles.Image src={item.image} alt={item.name} />
      <OrderDetailsSectionStyles.Details>
        <OrderDetailsSectionStyles.ProductName variant="subtitle1">
          {item.name}
        </OrderDetailsSectionStyles.ProductName>
        <OrderDetailsSectionStyles.Quantity variant="body2">
          <span
            style={{ fontWeight: 400, marginRight: "10px", color: "#00000080" }}
          >
            Cantidad:
          </span>{" "}
          {item.quantity}
        </OrderDetailsSectionStyles.Quantity>
        <OrderDetailsSectionStyles.PriceContainer>
          <OrderDetailsSectionStyles.FinalPrice variant="body2">
            {totalPrice}
          </OrderDetailsSectionStyles.FinalPrice>
          <OrderDetailsSectionStyles.DiscountPrice variant="body2">
            {totalDiscount}
          </OrderDetailsSectionStyles.DiscountPrice>
        </OrderDetailsSectionStyles.PriceContainer>
        <div>
          <OrderDetailsSectionStyles.PaymentStatus variant="body2">
            <OrderDetailsSectionStyles.PaymentValue>
              Pago:
            </OrderDetailsSectionStyles.PaymentValue>{" "}
            Pagado
          </OrderDetailsSectionStyles.PaymentStatus>
        </div>
      </OrderDetailsSectionStyles.Details>
    </OrderDetailsSectionStyles.RootPayment>
  );
};

export default OrderDetailsSection;
