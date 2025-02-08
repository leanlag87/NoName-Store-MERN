import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../../utils/DisplayMoney";
import * as CartItemStyles from "./Styles/CartItemStyles";
import { Typography } from "@mui/material";

function CartItem({
  deleteCartItems,
  item,
  decreaseQuantity,
  increaseQuantity,
  length,
}) {
  /// calculate price after discount
  let finalPrice = generateDiscountedPrice(item.price);
  let discountedPrice = item.price - finalPrice;
  discountedPrice = displayMoney(discountedPrice);
  let total = finalPrice * item.quantity;
  total = displayMoney(total);
  finalPrice = displayMoney(finalPrice);

  return (
    <CartItemStyles.StyledCard isSingleItem={length < 2}>
      <CartItemStyles.StyledCardMedia image={item.image} title={item.name} />
      <CartItemStyles.StyledCardContent>
        <div className="contentTop">
          <CartItemStyles.CartHeader>
            <CartItemStyles.Title variant="subtitle1">
              {item.name}
            </CartItemStyles.Title>

            <CartItemStyles.CartDeleteIcon
              aria-label="delete"
              onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </CartItemStyles.CartDeleteIcon>
          </CartItemStyles.CartHeader>

          <CartItemStyles.PriceItem>
            <CartItemStyles.CartSubHeadings variant="body2">
              PRECIO:
            </CartItemStyles.CartSubHeadings>
            <CartItemStyles.ItemPrice variant="subtitle1">
              {finalPrice}
            </CartItemStyles.ItemPrice>
            <CartItemStyles.ItemOldPrice
              variant="caption"
              component="span"
              color="black"
            >
              <del>{discountedPrice}</del>
            </CartItemStyles.ItemOldPrice>
          </CartItemStyles.PriceItem>
        </div>
        <CartItemStyles.ContentBottom>
          <div className="prod_details_additem">
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: ".8rem" }}
            >
              CANTIDAD:
            </Typography>
            <div className="additem">
              <CartItemStyles.QuantityButton
                onClick={() => decreaseQuantity(item.productId, item.quantity)}
                className="additem_decrease"
              >
                <RemoveIcon fontSize="small" />
              </CartItemStyles.QuantityButton>
              <CartItemStyles.QuantityInput
                readOnly
                type="number"
                value={item.quantity}
                className="input"
              />
              <CartItemStyles.QuantityButton
                onClick={() =>
                  increaseQuantity(item.productId, item.quantity, item.stock)
                }
                className="additem_increase"
              >
                <AddIcon fontSize="small" />
              </CartItemStyles.QuantityButton>
            </div>
          </div>

          <CartItemStyles.PriceItem>
            <CartItemStyles.CartSubHeadings variant="body2">
              TOTAL:
            </CartItemStyles.CartSubHeadings>
            <CartItemStyles.ItemPrice variant="subtitle1" className="price">
              {total}
            </CartItemStyles.ItemPrice>
          </CartItemStyles.PriceItem>
        </CartItemStyles.ContentBottom>
      </CartItemStyles.StyledCardContent>
    </CartItemStyles.StyledCard>
  );
}

export default CartItem;
