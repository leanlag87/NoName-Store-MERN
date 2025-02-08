import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/reducers/userSlice";
import { clearTokens } from "../../utils/auth";
import Loader from "../ui/Loader/Loader";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await dispatch(loadUser()).unwrap();
        } catch (error) {
          console.error("Error al cargar usuario:", error);
          clearTokens();
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
