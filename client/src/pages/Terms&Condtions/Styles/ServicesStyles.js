import styled from "@emotion/styled";
import {
  LocalShipping,
  Security,
  LocalOffer,
  CreditCard,
} from "@mui/icons-material";

export const ServicesSection = styled("div")(({ theme }) => ({
  backgroundColor: "#000",
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  fontFamily: "'Roboto', sans-serif",
}));

export const ServicesWrapper = styled("div")({
  display: "flex",
  gap: "2.5rem",
  width: "100%",
  flexWrap: "wrap",
  height: "auto",
  paddingTop: "20px",
  justifyContent: "center",
});

export const ServicesCard = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#111",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginLeft: "1rem",
  marginBottom: theme.spacing(2),
}));

export const ServicesIcon = styled("div")(({ theme }) => ({
  color: "#ee7b00d7",
  fontSize: "3rem",
  marginRight: theme.spacing(2.5),
  "& svg": {
    fontSize: "3rem !important",
  },
}));

export const ServicesCardTitle = styled("div")({
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
});

export const ServicesCardInfo = styled("div")({
  color: "rgba(255, 255, 255, 0.7)",
  fontWeight: 300,
  fontSize: "0.8rem",
});

// Estilos específicos para cada icono
export const StyledLocalShipping = styled(LocalShipping)({
  // Estilos para LocalShipping
});

export const StyledSecurity = styled(Security)({
  // Estilos para Security
});

export const StyledLocalOffer = styled(LocalOffer)({
  // Estilos para LocalOffer
});

export const StyledCreditCard = styled(CreditCard)({
  // Estilos para CreditCard
});
