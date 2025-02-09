import styled from "@emotion/styled";
import {
  Typography,
  TextField,
  Grid,
  Radio,
  Button,
  Divider,
  Link,
} from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import { ReactComponent as MasterCard } from "../../../assets/payment-svg/mastercard.svg";
import { ReactComponent as Visa } from "../../../assets/payment-svg/visa.svg";
import { ReactComponent as Paytm } from "../../../assets/payment-svg/paytm.svg";

export const PaymentPage = styled("div")({
  padding: "1rem 0",
  width: "100%",
  backgroundColor: "white",
  overflow: "hidden",
});

export const PaymentPageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
}));

export const PaymentBox = styled("div")(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "0.5rem",
  overflow: "hidden",
  backgroundColor: "white",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    marginTop: "1rem",
    padding: "2rem",
  },
}));

export const PaymentHeading = styled(Typography)({
  fontWeight: "800",
  marginBottom: "1rem",
  fontSize: "1.5rem",
  textTransform: "uppercase",
});

export const SecurePayment = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: "300",
  backgroundColor: "#f5f5f5 !important",
  width: "90%",
  padding: "1rem",
  gap: "0.8rem",
  marginBottom: "1rem",
  "& svg": {
    fontSize: "2rem",
  },
}));

// Iconos como componentes
export const StyledAssuredWorkloadOutlinedIcon = styled(
  AssuredWorkloadOutlinedIcon
)({});
export const StyledCreditCardIcon = styled(CreditCard)({});
export const StyledEditIcon = styled(EditIcon)({});

export const Icons = styled("div")({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  width: "100%",
  "& svg": {
    fontSize: "1.8rem",
    cursor: "pointer",
  },
});

export const CardContainer = styled("div")({
  padding: "1rem",
  border: "1px solid #f5f5f5",
  borderRadius: "0.5rem",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  width: "90%",
});

export const SubHeading = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: "500",
  marginBottom: "1rem",
  "& svg": {
    fontSize: "1.5rem",
  },
});

export const CardDetails = styled(Grid)({
  width: "100%%",
  "& .MuiGrid-item": {
    marginBottom: "0.5rem",
  },
});

export const LabelText = styled(Typography)({
  fontWeight: "300",
});

export const OutlinedInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderRadius: "0 !important",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

export const CardSelection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "1rem",
  "& svg": {
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#00000080",
  },
});

export const RadioText = styled(Typography)({
  fontWeight: "400",
  fontSize: "1rem",
  color: "#00000080",
  cursor: "pointer",
  "&:hover": {
    color: "#000",
  },
});

export const StyledRadio = styled(Radio)({
  color: "#000",
  "&.Mui-checked": {
    color: "#000",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
  },
});

export const PlaceOrderBtn = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: "500",
  fontSize: "1rem",
  padding: "0.8rem 1rem",
  borderRadius: "0.5rem",
  width: "90%",
  marginLeft: "1rem",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#00000080",
  },
});

export const TermsAndConditionsText = styled(Typography)({
  fontFamily: "Roboto",
  color: "#727272",
  fontWeight: "400",
  lineHeight: "17px",
  paddingLeft: "16px",
  fontSize: "12px",
});

export const PrivacyText = styled(Link)({
  marginLeft: "4px",
  textDecoration: "underline",
  color: "black",
  fontSize: "14px",
  "&:hover": {
    color: "red",
  },
});

// Estilos para los inputs de la tarjeta
export const PaymentInput = styled("input")({
  width: "95%",
  padding: "18.5px 14px",
  border: "1px solid #000",
});

export const PaymentInput2 = styled("input")({
  width: "90%",
  padding: "18.5px 14px",
  border: "1px solid #000",
});

export const CardNumberInput = styled("div")({
  position: "relative",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderRadius: "0 !important",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

export const ExpiryInput = styled("div")({
  position: "relative",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderRadius: "0 !important",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

export const CvvInput = styled("div")({
  position: "relative",
});

// Iconos dentro de los inputs
export const InputIcon = styled("div")({
  position: "absolute",
  top: "50%",
  right: "1rem",
  transform: "translateY(-50%)",
  color: "#00000080",
  cursor: "pointer",
});

// Estilos para la sección de monto de pago
export const PaymentAmount = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  height: "fit-content",
  padding: "1rem 0.5rem 0 0.5rem",
  width: "40%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "2rem",
  },
}));

export const OrderDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "2rem 0.5rem 2rem 0.5rem",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "2rem",
  },
}));

export const OrderSubHeading = styled(Typography)({
  fontWeight: "600",
  fontSize: "1.5rem",
  marginBottom: "10px",
});

export const BoldDivider = styled(Divider)({
  borderBottom: `0.3px solid #3A3E3A`,
  margin: "5px 0",
  width: "99%",
});

export const ShippingDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "98%",
  padding: "1rem 1px",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "1rem 2rem",
  },
}));

export const ShippingAddress = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

export const ShippingAddressDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontWeight: "300",
  padding: "10px 0px",
  width: "70%",
});

export const ShippingAddressEdit = styled("div")({
  paddingRight: "1rem",
  "& svg": {
    fontSize: "1.8rem",
    cursor: "pointer",
    color: "black",
    "&:hover": {
      color: " #ee7b00d7",
    },
  },
});

// Estilos para el contenedor del resumen del pedido
export const OrderSummary = styled("div")({
  "& h4": {
    fontWeight: "600",
  },
});

// Estilos para los elementos del resumen del pedido
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

// Estilos para el separador en el resumen del pedido
export const SeparatorCart = styled("div")({
  width: "98%",
  height: "1px",
  backgroundColor: "#ccc",
  margin: "5px auto",
});

// Estilos para el precio total en el resumen del pedido
export const TotalPrice = styled(OrderSummaryItem)({
  "& h4": {
    fontSize: "1.5rem",
  },
});

// Estilos para el contenedor de la caja de cupón
export const CouponBoxWrapper = styled("div")({
  padding: "1rem 0.5rem",
});

// Estilos para el contenido de la caja de cupón
export const CouponBoxContent = styled("div")(({ isFocused }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "0.5rem",
  transition: "border-color 0.3s ease",
  ...(isFocused && {
    borderColor: "#000",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  }),
}));

// Estilos para el botón de aplicar cupón
export const CouponBoxApplyBtn = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: "500",
  fontSize: "0.8rem",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  marginLeft: "0.5rem",
  "&:hover": {
    backgroundColor: "#00000080",
  },
});

// Estilos para la imagen de logos de pago
export const PaymentLogoImg = styled("div")({
  padding: "1rem 0.5rem",
});

// Estilos para la imagen en sí
export const PaymentImg = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "contain",
});

// Estilos para los íconos de tarjetas de crédito
export const StyledMasterCard = styled(MasterCard)({
  width: "5%",
  height: "auto",
});

export const StyledVisa = styled(Visa)({
  width: "5%",
  height: "auto",
});

export const StyledPaytm = styled(Paytm)({
  width: "5%",
  height: "auto",
});
