import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as SidebarStyles from "./Styles/SidebarStyles";

function Sidebar() {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function accountHandler() {
    navigate("/account");
  }

  return (
    <>
      {!loading && (
        <>
          <SidebarStyles.SidebarContainer>
            <SidebarStyles.StyledAvatar
              src={user && user.avatar.url}
              alt="User Avatar"
            />
            <SidebarStyles.Name variant="subtitle1">
              {user && user.name}
            </SidebarStyles.Name>
            <SidebarStyles.Email variant="subtitle2">
              {user && user.email}
            </SidebarStyles.Email>
            <SidebarStyles.Divider />
            <SidebarStyles.SideBarMenu>
              <SidebarStyles.StyledLink to="/admin/dashboard">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledDashboardIcon fontSize="large" />
                  <span>Panel</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>

              <SidebarStyles.StyledLink to="/">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledHomeIcon fontSize="large" />
                  <span>Inicio</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>

              <SidebarStyles.StyledLink to="/admin/products">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledPostAddIcon fontSize="large" />
                  <span>Productos</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>

              <SidebarStyles.StyledLink to="/admin/new/product">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledAddIcon fontSize="large" />
                  <span>Agregar producto</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>

              <SidebarStyles.StyledLink to="/admin/orders">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledListAltIcon fontSize="large" />
                  <span>Pedidos</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>

              <SidebarStyles.StyledLink to="/admin/reviews">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledRateReviewIcon fontSize="large" />
                  <span>Reseñas</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>

              <SidebarStyles.StyledLink to="/contact">
                <SidebarStyles.SideBarMenuItem>
                  <SidebarStyles.StyledContactPageIcon fontSize="large" />
                  <span>Contacto</span>
                </SidebarStyles.SideBarMenuItem>
              </SidebarStyles.StyledLink>
            </SidebarStyles.SideBarMenu>
            <SidebarStyles.Divider />
            <SidebarStyles.AccountButton
              onClick={accountHandler}
              variant="contained"
            >
              <SidebarStyles.StyledManageAccountsIcon fontSize="large" />
              Cuenta
            </SidebarStyles.AccountButton>
          </SidebarStyles.SidebarContainer>
        </>
      )}
    </>
  );
}

export default Sidebar;
