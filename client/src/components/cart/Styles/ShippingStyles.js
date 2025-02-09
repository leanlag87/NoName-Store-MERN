import styled from "@emotion/styled";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export const ShippingRoot = styled("div")({
  width: "60%",
  margin: "auto",
});

export const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  alignSelf: "flex-start",
}));

export const FormControl = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minWidth: 200,
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "50%",
  backgroundColor: "#000000",
  color: "#FFFFFF",
  height: "3rem",
  "&:hover": {
    backgroundColor: " #ee7b00d7",
    color: "black",
  },
}));

export const OutlinedInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000000",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
  "& .MuiInputBase-input": {
    color: "#000000",
  },
  "& .MuiInputLabel-root": {
    color: "#000000",
  },
});

export const ShippingPage = styled("div")({
  padding: "2rem 0",
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const ShippingPageContainer = styled("div")({
  display: "flex",
  width: "85%",
  margin: "2rem auto",
  justifyContent: "space-around",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  padding: "2rem",
});

export const ShippingPageContainerLeft = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "50%",
});

export const ShippingPageContainerRight = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "35%",
});

export const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    color: "#000000",
  },
});

export const StyledCheckBox = styled(Checkbox)({
  color: "#000000",
});
