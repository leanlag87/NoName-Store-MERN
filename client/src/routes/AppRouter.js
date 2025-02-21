// Enrrutador principal de la aplicación
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./Users"; // Importa las rutas para usuarios
import Admin from "./Admin"; // Importa las rutas para administradores
//import Login from "../components/user/Login.jsx"; // Importa la página de inicio de sesión
//import SignUp from "../components/user/SingUp.jsx"; // Importa la página de registro
import NotFoundPage from "../pages/NotFoundPage.jsx"; // Importa la página 404
import { useSelector } from "react-redux";

// Función para rutas privadas
// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.user);
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// Función para rutas de administrador
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return isAuthenticated && user.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} /> */}

      {/* Rutas para usuarios */}
      <Route path="/*" element={<Users />} />

      {/* Rutas para administradores */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      {/* PrivateRoute
      <Route
        path="/private"
        element={
          <PrivateRoute>
            <div>Contenido Privado</div>
          </PrivateRoute>
        }
      /> */}

      {/* Ruta para 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
