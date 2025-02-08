import styled from "@emotion/styled";
import { Dialog, DialogContent, TextField, Button, Radio } from "@mui/material";
import { Rating } from "@mui/material";
import { Close } from "@mui/icons-material";

export const ReviewRoot = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: "2rem",
  backgroundColor: "white",
  width: "100%",
  overflow: "hidden",
}));

export const ReviewHeader = styled("h1")(({ theme }) => ({
  margin: "1rem auto",
  textAlign: "center",
  fontWeight: 800,
  fontSize: "2rem !important",
  marginBottom: theme.spacing(2),
  color: "#414141",
}));

export const SubHeadings = styled("h3")({
  fontSize: "16px",
  color: "#414141",
  fontWeight: 700,
});

export const BodyText = styled("p")({
  fontSize: "14px",
  color: "#414141",
  fontWeight: 500,
});

export const RadioText = styled("span")({
  fontSize: "14px",
  color: "#414141",
});

export const RadioButton = styled(Radio)({
  color: "#000000",
});

export const SubmitBtn = styled(Button)({
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  minHeight: "48px",
  padding: "0px 16px",
  width: "fit-content",
  background: "rgb(37, 37, 37)",
  color: "rgb(255, 255, 255)",
  "&:hover": {
    backgroundColor: "rgba(222, 9, 9, 0.744)",
    borderColor: "rgba(222, 9, 9, 0.744)",
    transform: "scale(1.05)",
  },
});

export const RatingContainer = styled("div")(({ theme }) => ({
  marginTop: "1rem 0",
  display: "inline-block",
  marginRight: theme.spacing(1),
}));

export const StyledRating = styled(Rating)({
  // Estilos para el componente Rating
});

export const Star = styled("span")({
  color: "black",
  fontSize: 24,
  marginTop: "2px",
});

export const RatingNumber = styled("span")(({ theme }) => ({
  display: "inline-block",
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1.5),
  fontWeight: "bold",
  fontSize: "1rem",
}));

export const SelectContainer = styled("div")(({ theme }) => ({
  textAlign: "right",
  marginTop: "-50px",
  display: "flex",
  flexDirection: "column",
  paddingRight: "1.5rem",
  [theme.breakpoints.down("xs")]: {
    visibility: "hidden",
  },
}));

export const SortBy = styled("span")(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    visibility: "hidden",
  },
}));

export const Select = styled("select")(({ theme }) => ({
  "& .MuiSelect-select": {
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "10px",
    paddingRight: "35px",
    borderRadius: "6px",
    fontSize: "14px",
    border: "1px solid #252525",
    position: "relative",
    "&:focus": {
      borderRadius: "6px",
      borderColor: "#252525",
    },
  },

  "& .MuiSelect-icon": {
    top: "calc(50% - 12px)",
    right: "12px",
  },
  [theme.breakpoints.down("xs")]: {
    visibility: "hidden",
  },
}));

export const MenuItem = styled("option")({
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(222, 9, 9, 0.744)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(222, 9, 9, 0.744)",
    color: "white",
  },
});

//dialog box

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "16px",
    fontWeight: 400,
    color: "black",

    "&.Mui-focused fieldset": {
      borderColor: "#414141",
    },
  },
}));

export const StyledDialog = styled(Dialog)({
  width: "80vw",
  height: "70vh",
  marginTop: 0,
  padding: "3rem",
  overflow: "hidden",
});

export const StyledDialogContent = styled(DialogContent)({
  height: "100%",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0.2em",
    height: "0.2em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "white",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "white",
    borderRadius: "10px",
  },
});

export const Container = styled("div")({
  display: "flex",
  flexDirection: "row",
  overflowX: "scroll",
  margin: 10,
  backgroundColor: "#f5f5f5",
  marginTop: "1rem",
  width: "100vw",
  "&::-webkit-scrollbar": {
    width: "0.5em",
    height: "0.5em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#414141",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "white",
    borderRadius: "10px",
  },
});

export const StyledCloseIcon = styled(Close)({});
