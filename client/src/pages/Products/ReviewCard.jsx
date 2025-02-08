import React, { useState, lazy, Suspense } from "react";
import { Typography, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import Loader from "../../components/ui/Loader/Loader";
import MyCard from "./Card";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as ReviewStyle from "./Styles/ReviewStyle";

const DialogBox = lazy(() => import("./DialogBox"));
const ReviewCard = ({ product }) => {
  const { isAuthenticated } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState("highest");
  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  // const sortedData = yourData.sort((a, b) => {
  //   switch (sortValue) {
  //     case "highest":
  //       return b.rating - a.rating;
  //     case "lowest":
  //       return a.rating - b.rating;
  //     case "latest":
  //       return new Date(b.date) - new Date(a.date);
  //     case "oldest":
  //       return new Date(a.date) - new Date(b.date);
  //     default:
  //       return 0;
  //   }
  // });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      toast.error("Por favor inicia sesión para escribir una reseña");
      navigate("/login");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ReviewStyle.ReviewRoot>
      <ReviewStyle.ReviewHeader variant="h5" component="h1">
        Reseñas de usuarios
      </ReviewStyle.ReviewHeader>
      <ReviewStyle.SubmitBtn
        variant="contained"
        fullWidth
        style={{ marginTop: "2rem" }}
        onClick={handleClickOpen}
      >
        Escribe tu opinión
      </ReviewStyle.SubmitBtn>

      <Suspense fallback={<Loader />}>
        <DialogBox
          open={open}
          handleClose={handleClose}
          style={{
            width: "80vw",
            height: "70vh",
            marginT: 0,
            padding: "3rem",
            overflow: "hidden",
          }}
        />
      </Suspense>
      <Grid container alignItems="center" style={{ marginTop: "2rem" }}>
        <Grid item>
          <ReviewStyle.RatingContainer>
            <Rating value={product.ratings} precision={0.5} readOnly />
          </ReviewStyle.RatingContainer>
        </Grid>
        <ReviewStyle.RatingNumber variant="body2">
          {product.ratings} Estrellas
        </ReviewStyle.RatingNumber>
        <Grid item>
          <Typography variant="body2">
            <strong> Total de opiniones : </strong>
            {product.numOfReviews}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end">
        <ReviewStyle.SelectContainer>
          <Grid item>
            <ReviewStyle.SortBy variant="body2">
              Ordenar por :
            </ReviewStyle.SortBy>
          </Grid>
          <Grid item>
            <ReviewStyle.Select
              value={sortValue ? sortValue : "highest"}
              onChange={handleSortChange} // Se usa onChange en lugar de onClick
              MenuProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                getContentAnchorEl: null,
                MenuListProps: { disableScrollLock: true },
              }}
            >
              <ReviewStyle.MenuItem value="highest">
                Mejor calificado
              </ReviewStyle.MenuItem>
              <ReviewStyle.MenuItem value="lowest">
                Calificación más baja
              </ReviewStyle.MenuItem>
              <ReviewStyle.MenuItem value="latest">
                Últimas reseñas
              </ReviewStyle.MenuItem>
              <ReviewStyle.MenuItem value="oldest">
                Reseñas más antiguas
              </ReviewStyle.MenuItem>
            </ReviewStyle.Select>
          </Grid>
        </ReviewStyle.SelectContainer>
      </Grid>
      <ReviewStyle.Container>
        {product.reviews &&
          product.reviews.map((review) => (
            <MyCard review={review} key={review._id} />
          ))}
      </ReviewStyle.Container>
    </ReviewStyle.ReviewRoot>
  );
};

export default ReviewCard;
