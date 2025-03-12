//Componente que gestiona la autenticación global
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/reducers/userSlice";
import { clearToken } from "../../utils/auth";
import { showToast } from "../../utils/showToast";
import Loader from "../ui/Loader/Loader";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        // Si hay token en localStorage

        try {
          // Cargar información del usuario al iniciar la app
          await dispatch(loadUser()).unwrap();
        } catch (error) {
          if (
            error !== "No autorizado" &&
            error !== "Error al cargar usuario"
          ) {
            showToast.error(error);
          }
          clearToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default AuthProvider;
