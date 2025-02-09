import styled from "@emotion/styled";
import { Avatar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export const SidebarContainer = styled("div")({
  backgroundColor: "#fff",
  padding: "2rem 0",
  boxShadow: "2px 10px 6px rgba(0, 0, 0, 0.4)",
  borderRadius: "5px",
  margin: "0 auto",
  width: "100%",
});

export const StyledAvatar = styled(Avatar)({
  width: "80px",
  height: "80px",
  border: "5px solid #414141",
  margin: "0 auto",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Name = styled(Typography)({
  fontWeight: "500",
  textAlign: "center",
  fontSize: "1rem",
});

export const Email = styled(Typography)({
  color: "#414141",
  marginBottom: "1.5rem",
  textAlign: "center",
  fontSize: "0.9rem",
});

export const Divider = styled("div")({
  height: "2px",
  width: "75%",
  backgroundColor: "#414141",
  margin: "2rem",
});

export const AccountButton = styled(Button)({
  marginLeft: "2rem !important",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#292929 !important",
  color: "white   !important",
  width: "70%     !important",
  padding: "0.8rem 2rem   !important",
  borderRadius: "4px !important",
  "&:hover": {
    backgroundColor: "#ee7b00d7 !important",
    color: "white !important",
  },
});

export const SideBarMenu = styled("ul")({
  listStyleType: "none",
  padding: 0,
  margin: "3rem  10px",
  width: "100%",
});

export const SideBarMenuItem = styled("li")({
  display: "flex",
  alignItems: "center",
  padding: "0.9rem 1rem",
  borderRadius: "2px",
  marginTop: "1.3rem",
  width: "75%",
  boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.3)",
  "&:hover": {
    backgroundColor: "#ee7b00d7",
    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
    "& svg": {
      color: "white",
    },
    "& span": {
      color: "white !important",
    },
  },
  "& svg": {
    color: "#414141",
    fontSize: "26px",
    margin: "0 20px  0 ",
  },
  "& span": {
    color: "#414141",
    fontSize: "1rem",
    fontWeight: "500",
    marginLeft: "1rem",
    textDecoration: "none",
    textDecorationLine: "none",
    transition: "color 0.3s ease",
  },
});

export const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

export const StyledDashboardIcon = styled(DashboardIcon)({});

export const StyledPostAddIcon = styled(PostAddIcon)({});

export const StyledAddIcon = styled(AddIcon)({});

export const StyledListAltIcon = styled(ListAltIcon)({});

export const StyledRateReviewIcon = styled(RateReviewIcon)({});

export const StyledManageAccountsIcon = styled(ManageAccountsIcon)({
  marginRight: "10px",
});

export const StyledHomeIcon = styled(HomeIcon)({});

export const StyledContactPageIcon = styled(ContactPageIcon)({});
