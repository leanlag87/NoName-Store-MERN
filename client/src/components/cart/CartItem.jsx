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
  quantity, // Recibir la cantidad como props
  decreaseQuantity,
  increaseQuantity,
  length,
  id,
}) {
  /// calcular el precio final
  //let finalPrice = generateDiscountedPrice(item.price);
  let finalPrice = generateDiscountedPrice(item.product.price);
  //let discountedPrice = item.price - finalPrice;
  let discountedPrice = item.product.price - finalPrice;
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
              //onClick={() => deleteCartItems(item.product._id)}
              onClick={() => deleteCartItems(id)} // Usar id pasado como prop
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
                // onClick={() =>
                //   decreaseQuantity(item.product._id, item.quantity)
                // }
                onClick={() => decreaseQuantity(id, quantity)} // id y quantity como props
                className="additem_decrease"
              >
                <RemoveIcon fontSize="small" />
              </CartItemStyles.QuantityButton>
              <CartItemStyles.QuantityInput
                readOnly
                type="number"
                // value={item.quantity}
                value={quantity} // Usar la prop quantity
                className="input"
              />
              <CartItemStyles.QuantityButton
                // onClick={() =>
                //   increaseQuantity(
                //     item.product._id,
                //     item.quantity,
                //     item.product.Stock
                //   )
                // }
                onClick={() =>
                  increaseQuantity(id, quantity, item.product.Stock)
                } //id y quantity como props
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
