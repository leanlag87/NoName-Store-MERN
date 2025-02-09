import styled from "@emotion/styled";
import { Avatar, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Rating from "@mui/material/Rating";

export const CardRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: 455,
  minHeight: "50vh",
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "4px",
  background: "white",
}));

export const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const TitleTypography = styled(Typography)({
  marginBottom: "1rem",
  fontWeight: 700,
});

export const CommentTextTypography = styled(Typography)({
  marginBottom: "1.5rem",
  fontSize: "14px",
  color: "#414141",
});

export const RecommendTypography = styled(Typography)({
  fontWeight: 700,
});

export const HelpfulContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

export const ThumbIcon = styled("span")(({ theme, clicked }) => ({
  marginRight: "5px",
  marginLeft: "2rem",
  cursor: "pointer",
  fontSize: "1.5rem",
  color: clicked ? "red" : "inherit",
  "&:hover": {
    color: "red",
  },
  display: "flex", // para centrar los iconos
  alignItems: "center", // para centrar los iconos
}));

export const SubHeadingsTypography = styled(Typography)({
  fontSize: "16px",
  color: "#414141",
  fontWeight: 700,
});

export const BodyTextTypography = styled(Typography)({
  fontSize: "14px",
  color: "#414141",
  fontWeight: 500,
});

export const StyledRating = styled(Rating)({
  color: "black",
  fontSize: 24,
  marginTop: "2px",
});

export const YesSpan = styled("span")({
  color: "green",
});

export const NoSpan = styled("span")({
  color: "red",
});

export const StyledThumbUpIcon = styled(ThumbUpIcon)({});

export const StyledThumbDownIcon = styled(ThumbDownIcon)({});
