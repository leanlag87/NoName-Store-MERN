import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const OrderPageContainer = styled("div")({
  backgroundColor: "#fff",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
  marginBottom: "1rem",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  marginTop: "7rem",
});

export const OrderPageTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "bold",
});

export const OrderPageText = styled(Typography)({
  color: "#6c757d",
  marginTop: "1rem",
});

export const OrderCardContainer = styled("div")({
  // Estilos para el contenedor de OrderCard si es necesario
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
