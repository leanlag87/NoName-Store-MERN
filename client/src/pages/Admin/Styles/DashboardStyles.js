import styled from "@emotion/styled";
import {
  BarChart,
  ShoppingCart,
  AssignmentInd,
  People,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import ProductImg from "../../../assets/admin/products.png";

export const DashboardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  backgroundColor: "#f1f1f1",
  justifyContent: "center",
  width: "100%",
  gap: "1rem",
  overflow: "hidden",
  margin: 0,
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
  gap: "1rem",
  justifyContent: "center",
  [theme.breakpoints.down("999")]: {
    width: "100%",
  },
}));

export const NavBarContainer = styled("div")({
  margin: "0rem",
});

export const SummaryCard = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  color: "white",
  width: "100%",
  height: "15rem",
  gap: "1rem",
  margin: "1rem 0 0 0",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "20rem",
    alignItems: "center",
    marginTop: "7rem !important",
  },
}));

export const CardContainer = styled("div")(({ theme, image }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#414141",
  margin: "0 1rem ",
  width: "30%",
  height: "10rem",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1) !important",
    backgroundColor: "#ee7b00d7",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, black) !important",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "32% !important",
    marginBottom: "1rem !important",
    padding: "1rem 2rem ! important",
  },
  [theme.breakpoints.down("sm")]: {
    width: "85% !important",
    marginBottom: "1rem !important",
    padding: "2rem 2rem ! important",
  },
  [theme.breakpoints.down("xs")]: {
    width: "85%",

    padding: "1.2rem",
    margin: "0   auto",
    marginBottom: "1rem",
    "&:hover": {
      transform: "scale(1.05) !important",
    },
  },
}));

export const TextContainer = styled("div")({
  marginTop: "0.5rem",
  textAlign: "center",
  color: "white",
  textShadow: "1px 1px 2px black",
});

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 800,
  marginBottom: "0.5rem",
  textShadow: "1px 1px 2px black",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
  },
}));

export const NumberText = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 500,
  textShadow: "1px 1px 2px black",
});

export const HeaderContent = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  color: "white",

  [theme.breakpoints.down("md")]: {
    "& svg": {
      fontSize: "2rem",
    },
  },

  [theme.breakpoints.down("sm")]: {
    "& svg": {
      fontSize: "3rem",
    },
  },
}));

export const Revenue = styled("div")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "-2.5rem auto 0",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    marginTop: "5rem !important",
  },
}));

export const DoughnutChartContainer = styled("div")(({ theme }) => ({
  height: "fit-content",
  width: "42%",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  padding: "1rem 2rem",
  margin: "0 1rem",
  [theme.breakpoints.down("md")]: {
    width: "30%",
    padding: "1rem 3rem",
    ".highcharts-background": {
      height: "350px !important",
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "85%",
    padding: "2rem",
    marginTop: "2rem",
  },

  [theme.breakpoints.down("xs")]: {
    width: "85%",
    marginBottom: "1rem",
    padding: "1.2rem",
  },
}));

export const RevenueContainer = styled("div")(({ theme }) => ({
  width: "42%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 1rem",
  height: "400px",
  backgroundColor: "black",
  borderRadius: "5px",
  padding: "1rem 2rem",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  transition: "background-color 0.3s",
  backgroundImage: `url(${ProductImg})`,
  backgroundSize: "cover",

  [theme.breakpoints.down("sm")]: {
    width: "85% !important",
    padding: "1rem",
    height: "250px",
  },

  [theme.breakpoints.down("md")]: {
    width: "30%",
    padding: "1rem 3rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
    width: "85% !important",
    padding: "2rem !important",
    height: "250px",
  },

  [theme.breakpoints.down("xs")]: {
    width: "85%",
    marginBottom: "1rem",
    padding: "1rem !important",
  },
}));

export const LineChartContainer = styled("div")(({ theme }) => ({
  width: "90%",
  height: "fit-content",
  backgroundColor: "white",
  alignItems: "center",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
  padding: "2rem",
  margin: "1rem auto",

  [theme.breakpoints.down("sm")]: {
    width: "85%",
  },

  [theme.breakpoints.down("xs")]: {
    width: "85%",
    marginBottom: "1rem",
    padding: "1.2rem",
  },
}));

// Iconos estilizados
export const StyledBarChart = styled(BarChart)({
  fontSize: "3rem",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
});

export const StyledShoppingCart = styled(ShoppingCart)({
  fontSize: "3rem",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
});

export const StyledAssignmentInd = styled(AssignmentInd)({
  fontSize: "3rem",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
});

export const StyledPeople = styled(People)({
  fontSize: "3rem",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
});
