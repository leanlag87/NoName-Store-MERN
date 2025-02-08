import styled from "@emotion/styled";
import { Dialog, DialogContent, Button } from "@mui/material";

export const CreditCard = styled("div")({
  width: 375,
  height: 225,
  margin: "9rem auto",
  padding: 16,
  borderRadius: 12,
  background: "linear-gradient(45deg, #000000 30%, #4e4e4e 90%)",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
  color: "white",
  fontFamily: "Arial, sans-serif",
  position: "relative",
  zIndex: 999,
});

export const CloseButton = styled("div")({
  position: "absolute",
  top: 16,
  right: 16,
  color: "white",
  cursor: "pointer",
  "&:hover": {
    color: "#ed1c24",
  },
});

export const Chip = styled("div")({
  width: 60,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(45deg, silver 30%, gold 90%)",
  position: "absolute",
  top: 16,
  left: 16,
});

export const CreditCardText = styled("div")({
  fontSize: 14,
  position: "absolute",
  top: 16,
  right: 64,
  cursor: "pointer",
});

export const CardNumber = styled("div")({
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  margin: "40px 0",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
});

export const CardDetails = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
});

export const Label = styled("div")({
  fontSize: 12,
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
});

export const Value = styled("div")({
  fontSize: 16,
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  cursor: "pointer",
  transform: "translateZ(0)",
});

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

export const StyledDialogContent = styled(DialogContent)({
  overflow: "hidden",
});

export const HintButton = styled(Button)({
  position: "absolute",
  bottom: 10,
  width: "fit-content",
  left: "50%",
  padding: "4px 8px",
  transform: "translateX(-50%)",
  fontSize: 16,
  color: "#ed1c24",
  fontWeight: "400",
  cursor: "pointer",
  textDecoration: "underline",
});
