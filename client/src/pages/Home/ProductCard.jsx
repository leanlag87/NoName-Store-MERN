import React from "react";
import { useDispatch } from "react-redux";
import * as ProductCardStyles from "./Styles/ProductCardStyles";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../../utils/DisplayMoney";
import { addToCart } from "../../store/reducers/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  let discountPrice = generateDiscountedPrice(product.price);
  discountPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(product.price);

  const truncated =
    product.description.split(" ").slice(0, 5).join(" ") + "...";
  const nameTruncated = product.name.split(" ").slice(0, 3).join(" ") + "...";

  const addTocartHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  return (
    <ProductCardStyles.StyledCard>
      <ProductCardStyles.StyledLink to={`/product/${product._id}`}>
        <ProductCardStyles.StyledCardActionArea>
          <ProductCardStyles.StyledCardMedia
            image={product?.images?.[0]?.url ?? "placeholder.jpg"}
            title={
              product?.images?.[0]?.url ? product.name : "Imagen no disponible"
            }
          />
          <ProductCardStyles.StyledCardContent>
            <ProductCardStyles.NameTypography
              gutterBottom
              color="black"
              fontWeight="bold"
            >
              {nameTruncated}
            </ProductCardStyles.NameTypography>
            <ProductCardStyles.RatingContainer>
              <ProductCardStyles.StyledRating
                name="rating"
                value={product.ratings}
                precision={0.1}
                readOnly
                size="small"
              />
              <ProductCardStyles.ReviewsTypography
                variant="body2"
                color="textSecondary"
              >
                ({product.numOfReviews})
              </ProductCardStyles.ReviewsTypography>
            </ProductCardStyles.RatingContainer>
            <ProductCardStyles.DescriptionTypography
              variant="body2"
              color="textSecondary"
              component="div"
            >
              {truncated}
            </ProductCardStyles.DescriptionTypography>
            <ProductCardStyles.PriceContainer>
              <ProductCardStyles.OldPriceTypography variant="body1">
                {oldPrice}
              </ProductCardStyles.OldPriceTypography>
              <ProductCardStyles.FinalPriceTypography variant="body1">
                {discountPrice}
              </ProductCardStyles.FinalPriceTypography>
            </ProductCardStyles.PriceContainer>
          </ProductCardStyles.StyledCardContent>
        </ProductCardStyles.StyledCardActionArea>
      </ProductCardStyles.StyledLink>
      <ProductCardStyles.ButtonContainer>
        <ProductCardStyles.AddToCartButton
          variant="contained"
          onClick={() => addTocartHandler(product._id, 1)}
        >
          Agregar al carrito
        </ProductCardStyles.AddToCartButton>
      </ProductCardStyles.ButtonContainer>
    </ProductCardStyles.StyledCard>
  );
};

export default ProductCard;
