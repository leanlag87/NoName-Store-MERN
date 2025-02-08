import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  Grid,
  DialogActions,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  newReview,
  resetNewReview,
} from "../../store/reducers/productSlice";
import * as ReviewStyle from "./Styles/ReviewStyle";

const DialogBox = ({ open, handleClose, id }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [recommend, setRecommend] = useState(false);

  const { success, error } = useSelector((state) => {
    return state.addNewReview;
  });

  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
  };

  const handleRecommendChange = (event) => {
    setRecommend(event.target.value);
  };

  const handleSubmit = () => {
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("comment", comment);
    myForm.set("ratings", ratings);
    myForm.set("recommend", recommend);
    if (id) {
      myForm.set("productId", id);
    } else {
      myForm.set("productId", productId);
    }
    dispatch(newReview(myForm));
    toast.success("Revisión publicada correctamente");
    handleClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Revisión publicada correctamente");
      dispatch(resetNewReview());
    }
  }, [dispatch, error, success]);

  return (
    <ReviewStyle.StyledDialog
      open={open}
      onClose={handleClose} // Aquí se usa onClose en lugar de handleClose
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <ReviewStyle.SubHeadings variant="h5">
              Escribe tu opinión
            </ReviewStyle.SubHeadings>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <ReviewStyle.StyledCloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <ReviewStyle.StyledDialogContent>
        <ReviewStyle.BodyText variant="body1">
          *Todos los campos son obligatorios a menos que estén marcados como
          opcionales.
        </ReviewStyle.BodyText>
        <Box mt={2}>
          <ReviewStyle.BodyText variant="body1">Titulo</ReviewStyle.BodyText>
          <ReviewStyle.StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Enter title here"
            value={title}
            onChange={handleTitleChange}
          />
        </Box>
        <Box mt={2}>
          <ReviewStyle.BodyText variant="body1">
            Descripción
          </ReviewStyle.BodyText>
          <ReviewStyle.StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Enter description here"
            multiline
            rows={4}
            value={comment}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Box mt={2}>
          <ReviewStyle.BodyText variant="body1">Rating</ReviewStyle.BodyText>
          <ReviewStyle.StyledRating
            name="rating"
            value={ratings}
            onChange={handleRatingChange}
            precision={0.5}
            size="large"
          />
        </Box>
        <Box mt={2}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: "14px", color: "#414141", fontWeight: "500" }}
            >
              ¿Recomendarías este producto?
            </FormLabel>
            <RadioGroup
              aria-label="recommendation"
              name="recommendation"
              value={recommend}
              onChange={handleRecommendChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="black" />} // Usar color="default" en lugar de color="black"
                label="Si"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="black" />} // Usar color="default" en lugar de color="black"
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <DialogActions>
          <ReviewStyle.SubmitBtn variant="outlined" onClick={handleSubmit}>
            Enviar
          </ReviewStyle.SubmitBtn>
        </DialogActions>
      </ReviewStyle.StyledDialogContent>
    </ReviewStyle.StyledDialog>
  );
};

export default DialogBox;
