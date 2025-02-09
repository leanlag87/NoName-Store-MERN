import styled from "@emotion/styled";
import { StepConnector, StepLabel } from "@mui/material";

export const Root = styled("div")(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.down("xm")]: {
    fontSize: 12,
  },
}));

export const StepReader = styled("div")(({ theme }) => ({
  marginTop: "7rem",
  [theme.breakpoints.down("xs")]: {
    marginLeft: "-2rem",
  },
}));

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 10,
  },
  "&.Mui-active": {
    "& .MuiStepConnector-line": {
      backgroundColor: "#000000",
    },
  },
  "&.Mui-completed": {
    "& .MuiStepConnector-line": {
      backgroundColor: "#000000",
    },
  },
  "& .MuiStepConnector-line": {
    height: 3,
    border: 0,
    backgroundColor: "#dddddd",
    borderRadius: 1,
  },
}));

export const ColorlibStepIconRoot = styled("div")(
  ({ theme, active, completed }) => ({
    backgroundColor:
      active || completed ? (active ? " #ee7b00d7" : "#000000") : "#666666",
    zIndex: 1,
    color: "#FFFFFF",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${theme.palette.background.paper}`,
    fontSize: 16,
    cursor: "pointer",
    margin: 0,
    marginTop: active || completed ? (active ? "0rem" : "0rem") : "0",
    ...(active && {
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    [theme.breakpoints.down("sm")]: {
      width: 20,
      height: 20,
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      width: 15,
      height: 15,
      fontSize: 12,
      "& .MuiStepLabel-label": {
        fontSize: 12,
      },
    },
  })
);

export const StepLabelStyled = styled(StepLabel)(({ theme }) => ({
  cursor: "pointer",
  [theme.breakpoints.down("xs")]: {
    "&.MuiStepLabel-label ": {
      fontSize: 12,
    },
    fontSize: 12,
  },
}));
