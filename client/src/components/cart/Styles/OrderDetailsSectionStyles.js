import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const RootPayment = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "2.5rem",
  padding: "1rem 0rem 0rem 0rem",
}));

export const Image = styled("img")(({ theme }) => ({
  width: "155px",
  height: "140px",
  objectFit: "cover",
  [theme.breakpoints.down(899)]: {
    width: "255px",
    height: "240px",
  },
}));

export const Details = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const ProductName = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  fontSize: "18px",
  marginBottom: theme.spacing(1),
}));

export const Quantity = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  marginBottom: theme.spacing(1),
  color: "#00000080",
}));

export const PriceContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const FinalPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 16,
}));

export const DiscountPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2),
  fontSize: 16,
}));

export const PaymentStatus = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 16,
  marginTop: theme.spacing(1),
}));

export const PaymentValue = styled("span")({
  fontWeight: 400,
  marginRight: "10px",
  color: "#00000080",
});
