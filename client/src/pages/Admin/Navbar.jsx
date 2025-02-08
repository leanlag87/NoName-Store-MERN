import React from "react";
import * as NavbarStyles from "./Styles/NavbarStyles";

const Navbar = ({ toggleHandler }) => {
  return (
    <NavbarStyles.NavbarContainer>
      <NavbarStyles.StyledMenuIcon onClick={toggleHandler}>
        <NavbarStyles.StyledMenuIconButton />
      </NavbarStyles.StyledMenuIcon>
      <NavbarStyles.DashboardHead>
        <NavbarStyles.StyledLink
          to="/admin/dashboard"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <NavbarStyles.HeaderLogo>
            <img src={require("../../assets/NoNameLogo.png")} alt="logo" />
          </NavbarStyles.HeaderLogo>
        </NavbarStyles.StyledLink>
      </NavbarStyles.DashboardHead>
      <NavbarStyles.StyledLink to="/contact">
        <NavbarStyles.ContactButton>
          Contacta con nosotros
        </NavbarStyles.ContactButton>
      </NavbarStyles.StyledLink>
    </NavbarStyles.NavbarContainer>
  );
};

export default Navbar;
