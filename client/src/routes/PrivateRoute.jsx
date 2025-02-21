import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, authInitialized } = useSelector(
    (state) => state.user
  );
  const location = useLocation();

  // Mostrar loader mientras se inicializa la autenticación o se está cargando
  if (!authInitialized || loading) {
    return <Loader />;
  }

  // Si el usuario no está autenticado, redirigir a login con la ruta actual
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};

export default React.memo(PrivateRoute);
