//Rutas protegidas para usuarios con rol de administrador
//Componente para proteger rutas de administrador

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/ui/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated && user.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

//Usa React.memo para memorizar el componente y evitar renderizados innecesarios
export default React.memo(AdminRoute);
