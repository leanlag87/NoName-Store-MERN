import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  Select,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

// Container principal
export const FormContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "7rem",
  paddingBottom: "3rem",
  height: "auto",
  backgroundColor: "white",
}));

// Formulario
export const Form = styled("form")({
  width: "350px",
  margin: "auto",
  borderRadius: "5px",
  padding: "2rem",
});

// Titulo
export const Heading = styled("h2")(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(3),
  color: "#414141",
  fontWeight: "bold",
}));

// Input text Filed
export const NameInput = styled(TextField)(({ theme }) => ({
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

export const LastNameInput = styled(TextField)(({ theme }) => ({
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

// Input text Filed
export const EmailInput = styled(TextField)(({ theme }) => ({
  position: "relative",
  "& > label": {
    left: ".2rem",
  },
  padding: "4px 0px",
  fontSize: "1rem",
  width: "100%",
  marginTop: theme.spacing(5.5),
  height: ".7rem",
}));

// Input text Filed
export const PasswordInput = styled(TextField)(({ theme }) => ({
  position: "relative",
  "& > label": {
    left: ".2rem",
  },
  padding: "4px 0px",
  width: "100%",
  height: ".7rem",
  marginTop: theme.spacing(5.5),
  "&.MuiOutlinedInput-input": {
    padding: "14px 14px",
  },
}));

export const StrengthIndicator = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const ShowPasswordButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  color: "rgb(0 0 0 / 85%)",
  fontSize: "12px",
  right: theme.spacing(2),
  transform: "translateY(-50%)",
  border: "none",
  "&:hover": {
    color: "#ee7b00d7",
    background: "none",
    border: "none",
  },
}));

export const RememberMeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  marginTop: theme.spacing(7),
  "& .MuiIconButton-label": {
    color: "black",
  },
}));

export const ForgotPasswordLink = styled(Link)({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
    color: "#ee7b00d7",
  },
});

export const TermsAndConditionsText = styled("p")(({ theme }) => ({
  fontFamily: "Roboto",
  color: "#727272",
  textAlign: "center",
  lineHeight: "17px",
  paddingLeft: "4px",
  marginTop: theme.spacing(2),
  fontSize: "12px",
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
    borderColor: "#ee7b00d7",
  },
}));

export const PrivacyText = styled(Link)({
  marginLeft: "4px",
  textDecoration: "none",
  color: "black",
  fontSize: "14px",
  "&:hover": {
    color: "#ee7b00d7",
    textDecoration: "none",
  },
});

export const CreateAccount = styled(Link)({
  fontSize: "1rem",
  fontWeight: 500,
  color: "#121212",
  paddingLeft: "6px",
  textDecoration: "none",
  "&:hover": {
    color: "#ee7b00d7",
    textDecoration: "none",
  },
});

// Input text Filed
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

// signUp
export const StyledAvatar = styled(Avatar)({
  margin: "8px auto",
  backgroundColor: "black",
});

export const Gridcheckbox = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "3rem",
});

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "& .MuiTypography-body1": {
    fontSize: "14px",
  },
  marginTop: theme.spacing(1),
  "& .MuiIconButton-label": {
    color: "black",
  },
}));

// image uploader
export const ImageUploaderRoot = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "3.5rem",
});

export const StyledAvatar2 = styled(Avatar)({
  marginLeft: "6px",
  backgroundColor: "black",
  "&.MuiAvatar-colorDefault": {
    color: "#fff",
    backgroundColor: "black",
  },
  "&:hover": {
    backgroundColor: "#ee7b00d7",
  },
});

export const Input = styled("input")({
  display: "none",
});

// Update and create product styles ====================>>
export const UpdateProduct = styled("div")(({ theme }) => ({
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

export const FirstBox1 = styled("div")(({ theme }) => ({
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

export const ToggleBox1 = styled("div")({
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

export const SecondBox1 = styled("div")(({ theme }) => ({
  width: "75%",
  backgroundColor: "#f1f1f1",
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

export const NavBar1 = styled("div")({
  margin: "0rem",
});

export const Form2 = styled("form")({
  marginTop: "-6rem",
});

export const UploadAvatarButton = styled(Button)({
  color: "white",
  width: "fit-content",
  backgroundColor: "#414141",
  height: "2.5rem",
  "&:hover": {
    backgroundColor: "#ee7b00d7",
  },
});

export const UploadAvatarText = styled("span")({
  fontSize: "14px",
  backgroundColor: "inherit",
  fontWeight: 500,
  color: "#fff",
  padding: "0 1rem",
});

export const ImgIcon = styled("div")({
  width: "auto",
  marginLeft: "1rem",
  alignSelf: "center",
  "& svg": {
    color: "#414141",
    fontSize: "2.5rem !important",
    boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
  },
});

export const DescriptionInput = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(5.5),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      color: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
      color: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      color: "black",
      outline: "none",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "13px 8px",
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
}));

export const DescriptionIcon = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const SelectOption = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(5.5),
  position: "relative",
  width: "100%",
}));

export const ImageArea = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "18px",
  width: "90%",
  overflowX: "scroll",
  scrollbarWidth: "10px",
  margin: "2rem 0",
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "5px",
  },
  padding: "3px 16px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
}));

export const Image = styled("img")(({ theme }) => ({
  width: "4.5rem ",
  height: "4rem ",
  objectFit: "cover",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
}));

export const LabelText = styled("span")(({ category }) => ({
  color: "#414141",
  fontSize: "14px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "14px",
  pointerEvents: "none",
  opacity: category ? 0 : 1,
  transition: "opacity 0.3s ease",
}));

export const StyledFormControl = styled(FormControl)({
  width: "100%",
});

export const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: "13px 8px",
  },
  "& .MuiInputLabel-outlined": {
    pointerEvents: "none",
    fontSize: "14px",
    textAlign: "center",
    color: "#414141",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#ee7b00d7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      outlineColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
  "& .MuiSelect-root": {
    padding: "10px",
    color: "black",
  },
  "& .MuiSelect-icon": {
    marginRight: "-4px",
    color: "gray",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#ee7b00d7",
    color: "white",
  },
}));

export const Menu = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  "& .MuiMenuItem-root": {
    color: "black",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#ee7b00d7",
    color: "white",
  },
}));

//agregado al final para probar
export const SidebarContainer = styled("div")(({ theme }) => ({
  // Estilos base (comunes a ambos estados)
  margin: "0rem",
  height: "fit-content",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  display: "block",

  // Estilos específicos para cada estado (usando la prop sx)
  "&.firstBox": {
    width: "20%",
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },
  "&.toggleBox": {
    width: "16rem",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
}));
