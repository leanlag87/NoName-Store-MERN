import styled from "@emotion/styled";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "280px",
  height: "auto",
  margin: theme.spacing(2),
  backgroundColor: "white",
  cursor: "pointer",
}));

export const StyledCardActionArea = styled(CardActionArea)({
  // Estilos si son necesarios
});

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  width: "90%",
  objectFit: "cover",
  margin: "1rem 1rem 0 1rem",
}));

export const StyledCardContent = styled(CardContent)({
  // Estilos si son necesarios
});

export const NameTypography = styled(Typography)({
  fontWeight: "700 !important",
});

export const RatingContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const StyledRating = styled(Rating)({
  color: "#ee7b00d7 !important",
  marginRight: 8,
  fontWeight: "400",
});

export const ReviewsTypography = styled(Typography)({});

export const DescriptionTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 500,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
}));

export const PriceContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const OldPriceTypography = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.6)",
  marginRight: theme.spacing(1),
}));

export const FinalPriceTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.2rem",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

export const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "0.5rem",
});

export const AddToCartButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  borderRadius: 4,
  fontWeight: "bold",
  width: "100%",
  height: 45,
  "&:hover": {
    backgroundColor: "#ee7b00d7",
    color: "black",
    fontWeight: "bold",
  },
});
