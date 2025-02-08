import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

export const StyledCarousel = styled(Carousel)`
  .carousel .slide .legend {
    background: transparent !important;
    width: 100%;
    text-align: center;
    padding: 0;
  }
`;

export const SlideContent = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#fff",
  zIndex: 2,
});

export const Quote = styled("h2")({
  fontSize: "2rem",
  marginBottom: "1rem",
  color: "#fff",
});

export const SaleText = styled("h3")({
  fontSize: "1.5rem",
  marginBottom: "2rem",
  color: "#fff",
});

export const ProductButton = styled(Button)({
  backgroundColor: "#fff !important",
  color: "#000 !important",
  padding: "10px 20px !important",
  "&:hover": {
    backgroundColor: "#000 !important",
    color: "#fff !important",
  },
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
});
