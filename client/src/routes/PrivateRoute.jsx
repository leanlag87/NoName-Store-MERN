// Objetivo: Crear un componente de ruta privada que redirija a la página de login si el usuario no está autenticado
//Componente para proteger rutas privadas

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../store/reducers/userSlice";
import Loader from "../components/ui/Loader/Loader";

const PrivateRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Cargar el usuario si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  // Mostrar un loader mientras se carga el usuario
  if (loading) {
    return <Loader />;
  }
  //Si el usuario no está autenticado, redirigir a la página de login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  //Si el usuario no es administrador y la ruta es solo para administradores, redirigir a la página de login
  if (isAdmin && user.role !== "admin") {
    // Puedes redirigir a una página de error 403 Forbidden
    return <Navigate to="/login" />;
  }
  //Si el usuario está autenticado y la ruta es privada, mostrar el contenido
  return children;
};

export default PrivateRoute;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const { loading, isAuthenticated } = useSelector((state) => state.user);

//   if (loading) {
//     return <div>Cargando...</div>; // Puedes usar tu propio componente de Loader
//   }

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
