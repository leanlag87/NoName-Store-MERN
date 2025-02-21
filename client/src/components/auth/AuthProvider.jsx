// //Componente que gestiona la autenticación global
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "../../store/reducers/userSlice";
// import { clearTokens } from "../../utils/auth";
// import { showToast } from "../../utils/showToast";
// import Loader from "../ui/Loader/Loader";

// const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);
//   const { user } = useSelector((state) => state.user);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       console.log("AuthProvider: Iniciando inicialización de auth");
//       const token = localStorage.getItem("token");
//       console.log("AuthProvider: Token en localStorage:", !!token);

//       if (token && !user) {
//         console.log("AuthProvider: Intentando cargar usuario con token");
//         try {
//           await dispatch(loadUser()).unwrap();
//           console.log("AuthProvider: Usuario cargado exitosamente:", user);
//         } catch (error) {
//           console.log("AuthProvider: Error al cargar usuario:", error);
//           if (
//             error !== "No autorizado" &&
//             error !== "Error al cargar usuario"
//           ) {
//             showToast.error(error);
//           }
//           clearTokens();
//         }
//       }
//       setIsLoading(false);
//       console.log("AuthProvider: Finalizada inicialización, isLoading: false");
//     };

//     initializeAuth();
//   }, [dispatch, user]);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return children;
// };

// export default AuthProvider;

//Componente que gestiona la autenticación global
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/reducers/userSlice";
import { clearTokens } from "../../utils/auth";
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
          await dispatch(loadUser()).unwrap();
        } catch (error) {
          if (
            error !== "No autorizado" &&
            error !== "Error al cargar usuario"
          ) {
            showToast.error(error);
          }
          clearTokens();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]); // Elimina user como dependencia

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default AuthProvider;
