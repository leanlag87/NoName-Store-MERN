import styled from "@emotion/styled";
import { Typography, Divider, Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

export const ProcessOrderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  backgroundColor: "#f1f1f1",
  justifyContent: "center",
  width: "97%",
  gap: "1rem",
  overflow: "hidden",
  marginTop: "-1rem",
}));

export const FirstBox = styled("div")(({ theme }) => ({
  width: "20%",
  margin: "0rem",
  height: "fit-content",
  backgroundColor: "white",
  marginTop: "-1rem",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  display: "block",
  [theme.breakpoints.down("999")]: {
    display: "none",
  },
}));

export const ToggleBox = styled("div")({
  width: "16rem",
  margin: "0rem",
  height: "fit-content",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  display: "block",
  zIndex: "100",
  position: "absolute",
  top: "58px",
  left: "17px",
});

export const SecondBox = styled("div")(({ theme }) => ({
  width: "75%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  [theme.breakpoints.down("999")]: {
    width: "100%",
  },
}));

export const NavBarContainer = styled("div")({
  margin: "0rem",
});

export const MainInfo = styled("div")(({ theme }) => ({
  backgroundColor: "white !important",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  width: "92%",
  margin: "0 auto",
  padding: "0rem 3rem 2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "0rem 1rem 2rem 1rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
    padding: "0rem 0.5rem 2rem 0.5rem",
  },
}));

export const OrderDetailsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginLeft: "3rem",
  padding: "2rem 0.5rem 2rem 0.5rem",
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    padding: "1rem",
    marginLeft: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%",
    padding: "0 0.5rem",
    marginLeft: "0rem",
  },
}));

export const OrderSubHeading = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: "1.5rem",
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
    padding: "0 2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1rem",
    padding: "0 1rem",
  },
}));

export const BoldDivider = styled(Divider)(({ theme }) => ({
  borderBottom: `0.3px solid #3A3E3A`,
  margin: "0 0 0 3rem",
  width: "52%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    margin: "0 0 0 1rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%",
    margin: "0 0 0 0.5rem",
  },
}));

export const ShippingDetailsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  marginLeft: "3rem",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "0 2rem",
    marginLeft: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%",
    padding: "0 1.5rem",
    marginLeft: "0rem",
  },
}));

export const ShippingAddressContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "0 2rem",
    marginLeft: "1rem",
    marginTop: "-1rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%",
    padding: "0 1.5rem",
    marginLeft: "0rem",
    marginTop: "-1rem",
  },
}));

export const ShippingAddressDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontWeight: "300",
  width: "50%",
  padding: "1rem 0px",
});

export const ShippingHeading = styled(Typography)({
  fontWeight: "800",
  fontSize: "1.5rem",
});

export const TotalPriceContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "18rem",
  marginLeft: "3.1rem",
  marginTop: "-1rem",
  marginBottom: "-1rem",
  [theme.breakpoints.down("sm")]: {
    gap: "10rem",
    marginLeft: "2rem",
  },
  [theme.breakpoints.down("xs")]: {
    gap: "7rem",
    padding: "0rem 1.2rem",
  },
}));

export const TotalPriceP = styled("p")({
  fontSize: "16px",
  fontWeight: 500,
});

export const TotalPriceH4 = styled("h4")({
  fontSize: "16px",
  fontWeight: 800,
});

export const GreenFont = styled("p")({
  color: "green",
  "& b": {
    color: "green",
  },
});

export const RedFont = styled("p")({
  color: "red",
});

export const UpdateOrderForm = styled("form")(({ theme }) => ({
  backgroundColor: "white",
  marginLeft: "3rem",

  "& > div": {
    display: "flex",
    width: "100%",
    alignItems: "center",
    "& > select": {
      padding: "1vmax 4vmax",
      margin: "2rem 0",
      width: "50%",
      boxSizing: "border-box",
      border: "1px solid rgba(0, 0, 0, 0.267)",
      borderRadius: "4px",
      font: "300 0.9vmax cursive",
      outline: "none",
    },
    "& > svg": {
      position: "absolute",
      transform: "translateX(1vmax)",
      fontSize: "1.6vmax",
      color: "rgba(0, 0, 0, 0.623)",
    },
  },
  [theme.breakpoints.down("799")]: {
    width: "100%",
    padding: "1rem",
    marginLeft: "0rem",
    "& > div > select": {
      padding: "2.5vmax 2.5vmax",
      font: "300 1.7vmax cursive",
    },
    "& > div > svg": {
      fontSize: "2.8vmax",
    },
  },
}));

export const PlaceOrderBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: "500",
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  width: "50%",
  marginBottom: "1rem",
  marginTop: "-1rem",
  "&:hover": {
    backgroundColor: "#00000080",
  },
  [theme.breakpoints.down("799")]: {
    width: "50%",
    padding: "0.5rem 1rem",
    marginLeft: "0rem",
  },
}));

export const StyledAccountTreeIcon = styled(AccountTreeIcon)({});

export const OrderSummaryItem = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0px",
  "& span": {
    fontWeight: "400",
  },
  "& p": {
    fontWeight: "500",
  },
});

export const StyledTypography = styled(Typography)({});
