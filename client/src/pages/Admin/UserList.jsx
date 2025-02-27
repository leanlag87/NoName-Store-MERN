import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

// Componentes
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";

// Acciones Redux
import {
  getUsers,
  clearErrors,
  deleteUser,
  resetDelete,
} from "../../store/reducers/userSlice";

// Utilidades y estilos
import "./Styles/productList.css";
import { getUserListColums } from "../utils/userListColums";

function UserList() {
  // Redux y Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Estados de Redux
  const {
    error,
    users,
    loading,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.user);

  // Estado para la barra lateral
  const [toggle, setToggle] = useState(false);

  // para manejar errores, eliminaciones y cargar usuarios
  useEffect(() => {
    // Cargar la lista de usuarios al montar el componente
    dispatch(getUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch(resetDelete());
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, message]);

  // Handler para eliminar un usuario
  const deleteUserHandler = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?"))
      dispatch(deleteUser(id));
  };

  // Handler para controlar el toggle
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // para cerrar automáticamente la barra lateral en pantallas grandes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  // Calculamos las columnas usando la función importada y pasando el handler
  const columns = getUserListColums(deleteUserHandler);

  // Preparamos los rows para el DataGrid
  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Gestión de Usuarios - Admin" />

          <div className="product-list" style={{ marginTop: 0 }}>
            {/* Barra lateral de navegación */}
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>
            {/* Contenido principal */}
            <div className="list-table">
              {/* Barra de navegación superior */}
              <Navbar toggleHandler={toggleHandler} />
              {/* Contenedor de la tabla de usuarios */}
              <div className="productListContainer">
                <h4 id="productListHeading">TODOS LOS USUARIOS</h4>
                {/* Tabla de usuarios usando DataGrid */}
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserList;
