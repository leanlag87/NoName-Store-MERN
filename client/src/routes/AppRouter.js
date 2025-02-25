// Enrrutador principal de la aplicación
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from "./AdminRoute.jsx";
import Users from "./Users"; // Importa las rutas para usuarios
import Admin from "./Admin"; // Importa las rutas para administradores
import NotFoundPage from "../pages/NotFoundPage.jsx"; // Importa la página 404

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas para administradores */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      {/* Rutas para usuarios */}
      <Route path="/*" element={<Users />} />

      {/* Ruta para 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
