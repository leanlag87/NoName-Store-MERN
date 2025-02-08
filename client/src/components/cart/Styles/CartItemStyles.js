import styled from "@emotion/styled";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme, isSingleItem }) => ({
  display: "flex",
  alignItems: "center",
  padding: isSingleItem ? "1rem 1rem" : "1.5rem 2rem",
  width: "fit-content",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  margin: "1rem 2rem",
  height: "auto",

  [theme.breakpoints.down(899)]: {
    padding: "3rem",
    margin: "1rem 3rem",
  },
  [theme.breakpoints.down(699)]: {
    padding: "2rem",
    margin: "1rem",
    width: "80%",
  },
  [theme.breakpoints.down(499)]: {
    padding: "2rem",
    margin: "1rem",
    width: "65%",
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "200px",
  height: "240px",
  marginRight: "16px",

  [theme.breakpoints.down(699)]: {
    width: "35%",
    marginLeft: "-2rem",
    paddingRight: "1rem",
  },
  [theme.breakpoints.down(599)]: {
    width: "30%",
    marginLeft: "-2rem",
    paddingRight: "1rem",
  },
  [theme.breakpoints.down(499)]: {
    width: "20%",
    marginLeft: "-2rem",
    paddingRight: "1rem",
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "fit-content",

  [theme.breakpoints.down(699)]: {
    padding: 0,
    width: "fit-content",
  },
  [theme.breakpoints.down(599)]: {
    padding: 0,
    width: "fit-content",
  },
}));

export const CartHeader = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
});

export const Title = styled(Typography)(({ theme }) => ({
  width: "90%",
  fontSize: "1rem",
  fontWeight: 600,
  marginLeft: "1rem",
  [theme.breakpoints.down(599)]: {
    fontSize: "14px",
    marginLeft: 0,
  },
  "& .MuiTypography-subtitle1 ": {
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
  },
}));

export const CartDeleteIcon = styled(IconButton)(({ theme }) => ({
  color: "black",
  marginTop: "-.5rem",

  [theme.breakpoints.down(599)]: {
    marginRight: "-2.5rem",
  },
  "&:hover": {
    color: "#ed1c24",
  },
  [theme.breakpoints.down(499)]: {
    marginRight: "-2rem",
  },
}));

export const PriceItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: "1rem",
  marginLeft: "1.2rem",
  [theme.breakpoints.down(599)]: {
    marginLeft: "0rem",
    marginRight: "-1rem",
  },
}));

export const CartSubHeadings = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  textTransform: "uppercase",
  color: "#414141",
  [theme.breakpoints.down(599)]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down(499)]: {
    fontSize: "12px",
  },
}));

export const ItemPrice = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  [theme.breakpoints.down(599)]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down(499)]: {
    fontSize: "13px",
  },
}));

export const ItemOldPrice = styled(Typography)(({ theme }) => ({
  marginLeft: "-8px",
  fontSize: "14px",
  fontWeight: 400,

  [theme.breakpoints.down(499)]: {
    fontSize: "12px",
  },
}));

export const ContentBottom = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "1rem",
  alignItems: "baseline",
  width: "fit-content",
  flexDirection: "column",
  [theme.breakpoints.down(599)]: {
    marginLeft: "0rem",
    marginRight: "-1rem",
  },
  [theme.breakpoints.down(550)]: {
    position: "relative",
    marginLeft: "0rem",
  },
}));

export const QuantityInput = styled(Input)({
  "& .MuiInputBase-input": {
    textAlign: "center",
    width: "2rem",
    padding: "0px",
  },
});

export const QuantityButton = styled(IconButton)(({ theme }) => ({
  padding: "5px",
  margin: "0px",
  border: "1px solid #ccc",
  borderRadius: "4px",
}));
