import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const UpdateUserContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  backgroundColor: "#f1f1f1",
  justifyContent: "center",
  width: "100%",
  gap: "1rem",
  overflow: "hidden",
  margin: "-1.1rem 0 0 0",
  padding: 0,
}));

export const FirstBox = styled("div")(({ theme }) => ({
  width: "20%",
  margin: "0rem",
  height: "fit-content",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  display: "block",
  [theme.breakpoints.down("999")]: {
    display: "none",
  },
}));

export const ToggleBox = styled("div")({
  width: "16rem",
  margin: "0rem",
  height: "fit-content",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  display: "block",
  zIndex: "100",
  position: "absolute",
  top: "58px",
  left: "17px",
});

export const SecondBox = styled("div")(({ theme }) => ({
  width: "75%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  margin: "-0.5rem 0 0 0",
  gap: "10px",
  justifyContent: "center",
  [theme.breakpoints.down("999")]: {
    width: "100%",
  },
}));

export const NavBarContainer = styled("div")({
  margin: "0rem",
});

export const FormSection = styled("div")({
  width: "100%",
  margin: "auto",
  borderRadius: "5px",
  height: "100vh",
  backgroundColor: "white",
  padding: "1rem 2rem",
});

export const Form = styled("form")({
  width: "350px",
  margin: "-1rem auto 0 auto",
  borderRadius: "5px",
  padding: "2rem",
});

export const StyledAvatar = styled(Avatar)({
  margin: "8px auto",
  backgroundColor: "black",
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "black",
    padding: "12px 14px",
  },
  "& .MuiInputLabel-root": {
    color: "black",
    fontSize: "14px",
    textAlign: "center",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
    fontSize: "14px",
    textAlign: "center",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "black",
      color: "black",
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px 8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      color: "black",
      outline: "none",
    },
  },
}));

export const Heading = styled(Typography)({
  textAlign: "center",
  marginBottom: "3rem",
  color: "#414141",
  fontWeight: "bold",
});

export const NameInput = styled("div")(({ theme }) => ({
  position: "relative",
  "& > label": {
    left: ".2rem",
  },
  padding: "4px 0px",
  fontSize: "1rem",
  width: "100%",
  marginBottom: theme.spacing(5.5),
  height: ".7rem",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#000",
  border: "2px solid #000",
  margin: `${theme.spacing(3)}px 0`,
  marginTop: "1rem",
  "&:disabled": {
    backgroundColor: "#444444",
    color: "#FFFFFF",
    borderColor: "#444444",
  },
  "&:hover": {
    backgroundColor: "#ee7b00d7",
    color: "#fff",
    borderColor: "#ee7b00d7",
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  padding: "8px",
  marginBottom: theme.spacing(2),
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid rgba(0, 0, 0, 0.267)",
  "&:focus": {
    outline: "none",
    border: "none",
  },
  "& .MuiSelect-select": {
    paddingRight: "32px", // Ajusta el espacio para el icono
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Elimina el borde del contorno
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none", // Elimina el borde del contorno en hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none", // Elimina el borde del contorno en focus
  },
}));

export const StyledMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#ee7b00d7",
    color: "#fff",
  },
});

export const StyledMailOutlineIcon = styled(MailOutlineIcon)({
  fontSize: 20,
  color: "#414141",
});

export const StyledAccountCircleIcon = styled(AccountCircleIcon)({});
