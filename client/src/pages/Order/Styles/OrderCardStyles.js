import styled from "@emotion/styled";
import { Card, Typography, Button, Divider } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";

export const Root = styled("div")(({ theme }) => ({
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const OrderCardContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 2,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const FirstBlock = styled("div")(({ theme }) => ({
  height: "fit-content",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  width: "100%",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  marginTop: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const LeftSide = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
});

export const RightSide = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "0rem 0rem 1rem",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    justifyContent: "center",
  },
}));

export const OrderPlacedTypography = styled(Typography)({
  fontWeight: "500",
});

export const OrderDateTypography = styled(Typography)({
  color: "#141414",
});

export const TotalPriceTypography = styled(Typography)({
  fontWeight: "500",
  paddingRight: "5rem",
});

export const OrderIdTypography = styled(Typography)({
  paddingTop: "10px",
  fontWeight: "500",
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: "1.5rem 0rem",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const SecondBlock = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 2,
  marginBottom: 2,
  padding: "0rem 1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const SecondBlockLeft = styled("div")(({ theme }) => ({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    alignItems: "center",
  },
}));

export const SecondBlockRight = styled("div")(({ theme }) => ({
  width: "fit-content",
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem 0rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "1rem",
    justifyContent: "center",
  },
}));

export const ProductDetailsContainer = styled("div")({
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  padding: "1rem 0rem",
  marginBottom: 1,
});

export const ProductNameTypography = styled(Typography)({
  fontWeight: "500",
  marginBottom: 1,
});

export const ProductQtyTypography = styled(Typography)({
  marginBottom: 1,
});

export const DeliveryStatusTypography = styled(Typography)({
  marginBottom: 1,
});

export const StyledButton = styled(Button)({
  marginRight: 1,
  color: "rgb(37, 37, 37) !important",
  cursor: "pointer",
  backgroundColor: "transparent !important",
  border: "1px solid rgb(37, 37, 37) !important",
  "&:hover": {
    backgroundColor: "#E8E8E8 !important",
    borderColor: "#E8E8E8 !important",
  },
});

export const LeftSide2 = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: 2,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 0,
  },
}));

export const ShipToTypography = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 1,
});

export const AddressTypography = styled(Typography)({
  marginBottom: 1,
});

export const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  padding: "10px 0px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

export const BuyAgainButton = styled(Button)(({ theme }) => ({
  color: "#fff !important",
  cursor: "pointer",
  padding: "0px 16px",
  fontSize: "16px",
  backgroundColor: "rgb(37, 37, 37) !important",
  minHeight: "48px",
  borderRadius: "8px",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "#ed1c24 !important",
    borderColor: "#ed1c24 !important",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
  },
}));

export const ReviewButton = styled(Button)(({ theme }) => ({
  color: "#fff !important",
  width: "50vmin",
  cursor: "pointer",
  padding: "0px 4px",
  fontSize: "16px",
  backgroundColor: "rgb(37, 37, 37) !important",
  minHeight: "48px",
  borderRadius: "8px",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "#ed1c24 !important",
    borderColor: "#ed1c24 !important",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
  },
}));

export const AddressTextTypography = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "20px",
  color: "#141414",
});

export const Dialog = styled("div")(({ theme }) => ({
  width: "80vw",
  height: "70vh",
  marginTop: 0,
  padding: "3rem",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ProductImage = styled("img")({
  width: "100%",
  height: "160px",
});

export const StyledReplayIcon = styled(ReplayIcon)({
  marginRight: "8px",
});

export const StyledEditIcon = styled(EditIcon)({
  marginRight: "8px",
});
