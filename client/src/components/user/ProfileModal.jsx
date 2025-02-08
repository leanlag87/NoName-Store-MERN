import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Styles/profileModal.css";

const ProfileModal = ({ user, isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    handleClose();
  };

  return (
    <div className="profile-modal">
      <button
        className="profile-button"
        onClick={handleClick}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <PersonOutlineIcon />
      </button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              Mi Perfil
            </MenuItem>
            <MenuItem component={Link} to="/orders" onClick={handleClose}>
              Mis Pedidos
            </MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/login" onClick={handleClose}>
              Iniciar Sesión
            </MenuItem>
            <MenuItem component={Link} to="/register" onClick={handleClose}>
              Registrarse
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
};

export default ProfileModal;
