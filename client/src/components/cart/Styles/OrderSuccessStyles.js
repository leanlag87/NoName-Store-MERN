import styled from "@emotion/styled";
import { Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

export const OrderSuccessContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "9rem",
  backgroundColor: theme.palette.common.white,
}));

export const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: "8rem",
  color: theme.palette.success.main,
  marginBottom: theme.spacing(4),
}));

export const SuccessText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
  fontSize: "2rem",
  color: theme.palette.text.primary,
  textShadow: `2px 2px 4px ${theme.palette.text.secondary}`,
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

export const ViewOrdersButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: [theme.spacing(2), theme.spacing(4)],
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(4),
  textTransform: "uppercase",
  letterSpacing: 2,
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#ed1c24",
  },
}));
