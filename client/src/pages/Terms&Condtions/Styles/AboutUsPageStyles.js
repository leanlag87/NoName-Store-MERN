import styled from "@emotion/styled";
import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const AboutUsSection = styled("div")(({ theme }) => ({
  paddingTop: "8rem",
  paddingBottom: "4rem",
  backgroundColor: "white !important",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledContainer = styled(Container)({
  padding: "2rem",
  textAlign: "center",
  backgroundColor: "white !important",
  maxWidth: "100%",
});

export const AboutImage = styled("img")({
  width: "100%",
  height: "auto",
  marginTop: "3rem",
  marginBottom: "2rem",
});

export const AboutTitle = styled(Typography)(({ theme }) => ({
  color: "#414141",
  fontSize: "14px",
  padding: "2rem 1rem 2rem",
  fontFamily: "Roboto",
  fontWeight: "500 !important",
}));

export const AboutHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  padding: "2rem 1rem 2rem",
  fontWeight: "400 !important",
  color: "#414141",
  textAlign: "center",
}));

export const IntroText = styled(Typography)(({ theme }) => ({
  maxWidth: "800px",
  lineHeight: "1.5",
  margin: "1.5rem 0",
  color: "#292929",
  fontSize: "1.2rem",
  fontWeight: "400 !important",
  textAlign: "justify",
  padding: "0.8rem 1rem",
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  lineHeight: "1.5",
  margin: "2rem 0",
  color: "#292929",
  fontSize: "1rem",
  fontWeight: "400 !important",
  textAlign: "justify",
  padding: "0.8rem 1rem",
}));

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem 0",
  width: "100%",
  marginTop: "1rem",
});

export const ProductButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000000 !important",
  color: "white !important",
  width: "fit-content !important",
  padding: "0.8rem 2rem   !important",
  marginLeft: "3.3rem !important",
  borderRadius: "5px !important",
  "&:hover": {
    backgroundColor: "#ed1c24 !important",
    color: "white !important",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "15px !important",
  },
}));

export const ContactButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#292929 !important",
  color: "white   !important",
  width: "fit-content     !important",
  padding: "0.8rem 2rem   !important",
  marginLeft: "1.3rem !important",
  borderRadius: "5px !important",
  "&:hover": {
    backgroundColor: "#ed1c24 !important",
    color: "white !important",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.8rem 3.4rem   !important",
  },
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "none",
});
