import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/auth/AuthProvider";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppRouter />
        <ToastContainer
          position="top-center" // Posición de la notificación
          autoClose={5000} // Tiempo de cierre automático (ms)
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
