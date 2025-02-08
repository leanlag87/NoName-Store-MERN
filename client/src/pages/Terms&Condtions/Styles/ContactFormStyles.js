import styled from "@emotion/styled";
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

export const Root = styled(Box)(({ theme }) => ({
  padding: "8rem 0",
  backgroundColor: "white",
  width: "100%",
  overflow: "hidden",
}));

export const ContactContainer = styled("div")({
  width: "70%",
  margin: "0 auto",
});

export const Title = styled(Typography)(({ theme }) => ({
  color: "#414141",
  fontSize: "1.5rem !important",
  padding: "1rem 3rem",
  fontFamily: "Roboto",
  fontWeight: "700 !important",
  letterSpacing: "2px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px ",
    padding: "1rem 0",
  },
}));

export const StyledDivider = styled(Divider)({
  width: "90%",
  backgroundColor: "#b6b6b6",
  margin: "2rem 0 !important",
});

export const HelpTitle = styled(Typography)({
  fontSize: "18px",
  color: "black",
  padding: "2rem 0",
});

export const Para = styled(Typography)(({ theme }) => ({
  paddingBottom: "3rem",
  marginLeft: "0.5rem",
  color: "#414141",
  lineHeight: "1.5rem",
  fontSize: "16px !important",
  width: "90%",
  letterSpacing: "2px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const Address = styled(Typography)(({ theme }) => ({
  paddingBottom: "3rem",
  marginLeft: "0.5rem",
  color: "#414141",
  lineHeight: "1.5rem",
  fontSize: "16px !important",
  width: "90%",
  letterSpacing: "2px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ButtonGroup = styled("div")(({ theme }) => ({
  "& > *": {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
}));

export const SupportButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#292929 !important",
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

export const CallButton = styled(Button)(({ theme }) => ({
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

export const FormContainer = styled("form")({
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
});

export const FormField = styled(FormControl)({
  // marginBottom: "2rem",
  width: "100%",
});

export const SubmitButton = styled(Button)({
  alignSelf: "flex-start",
  backgroundColor: "#292929 !important",
  color: "white   !important",
  width: "fit-content     !important",
  padding: "1rem 3rem   !important",
  borderRadius: "5px !important",
  "&:hover": {
    backgroundColor: "#ed1c24 !important",
    color: "white !important",
  },
});

export const SelectOption = styled("div")({
  width: "100%",
  marginBottom: "2rem",
});

export const LabelText = styled(Typography)({
  color: "#000",
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
});

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  marginBottom: "2rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderRadius: "0 !important",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
  "& .MuiSelect-select": {
    backgroundColor: "white",
    color: "black",
    padding: "12px 14px",
  },
  "& .MuiSelect-icon": {
    color: "black",
  },
}));

export const StyledMenuItem = styled(MenuItem)({
  backgroundColor: "white",
  color: "black",
  "&:hover": {
    backgroundColor: "rgba(222, 9, 9, 0.744)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(222, 9, 9, 0.744)",
    color: "white",
  },
});

export const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "2rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
      borderRadius: "0 !important",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

export const SupportForm = styled("div")({
  width: "100%",
});
