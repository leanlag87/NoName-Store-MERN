import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/reducers/userSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Modal, Avatar } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import "../Styles/ProfileModal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatCreatedAt } from "../../../utils/dateFormatter";

const ProfileModel = ({ user, isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Renderizado condicional del perfil del usuario
  const renderUserProfile = () => {
    if (!isAuthenticated || !user) {
      return (
        <div className="welcome-message">
          <strong>¡Bienvenido!</strong>
          <p>Para acceder a su cuenta y administrar pedidos, inicie sesión.</p>
        </div>
      );
    }

    return (
      <div className="profile-info">
        <Avatar
          src={user.avatar?.url || ""}
          alt={user.name || "User"}
          className="avatar"
          style={{ width: "68px", height: "68px" }}
        />
        {user._id && (
          <p className="user-id">
            <strong>ID :</strong> {user._id.substring(0, 8)}
          </p>
        )}
        {user.name && (
          <p className="user-name">
            <strong>Nombre :</strong> {user.name}
          </p>
        )}
        {user.email && (
          <p className="user-email">
            <strong>Email :</strong> {user.email}
          </p>
        )}

        {formatCreatedAt(user) && (
          <p className="created-at">
            <strong>Se unió el:</strong> {formatCreatedAt(user)}
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Abrir el modal
  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };
  //Cerrar el modal
  const onClose = () => {
    setIsOpen(false);
  };

  //Funciones para redireccionar a las rutas
  function dashboardHandler() {
    //Redireccionar al dashboard
    setIsOpen(false);
    navigate("/admin/dashboard");
  }

  function accountHandler() {
    //Redireccionar a la cuenta
    setIsOpen(false);
    navigate("/account");
  }

  function ordersHandler() {
    //Redireccionar a las ordenes
    setIsOpen(false);
    navigate("/orders");
  }

  function cartHandler() {
    //Redireccionar al carrito
    setIsOpen(false);
    navigate("/cart");
  }

  function loginHandler() {
    //Redireccionar al login
    setIsOpen(false);
    navigate("/login");
  }

  function logoutUserHandler() {
    //Cerrar sesión
    setIsOpen(false);
    dispatch(logoutUser());
    toast.success("Sesión cerrada exitosamente");
  }

  return (
    <>
      <div className="profile-icon" onClick={handleOpen}>
        <PersonIcon
          className={`icon smaller ${isOpen ? "active" : ""}`}
          fontSize="large"
        />
        {isOpen ? (
          <ArrowDropUpIcon className="arrow-icon" />
        ) : (
          <ArrowDropDownIcon className="arrow-icon" />
        )}
      </div>
      {isOpen && (
        <Modal open={isOpen} onClose={onClose} className="modal-container">
          <div className="modal-content" ref={modalRef}>
            {renderUserProfile()}
            <div className="divider" />
            <div className="profile-menu">
              {isAuthenticated && user?.role === "admin" && (
                <div className="menu-item" onClick={dashboardHandler}>
                  <DashboardIcon className="menu-icon" />
                  <span>Panel</span>
                </div>
              )}
              <div className="menu-item" onClick={accountHandler}>
                <AccountCircleIcon className="menu-icon" />
                <span>Perfil</span>
              </div>
              <div className="menu-item" onClick={ordersHandler}>
                <AssignmentIcon className="menu-icon" />
                <span>Pedidos</span>
              </div>
              <div className="menu-item" onClick={cartHandler}>
                <ShoppingCartIcon className="menu-icon" />
                <span>Carrito</span>
              </div>
              {!isAuthenticated ? (
                <div className="menu-item" onClick={loginHandler}>
                  <LockOpenIcon className="menu-icon" />
                  <span>Acceso</span>
                </div>
              ) : (
                <div className="menu-item" onClick={logoutUserHandler}>
                  <ExitToAppIcon className="menu-icon" />
                  <span>Cerrar sesión</span>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfileModel;
