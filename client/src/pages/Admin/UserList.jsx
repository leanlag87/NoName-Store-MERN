import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/productList.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
//import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import {
  getUsers,
  clearErrors,
  deleteUser,
  resetDelete,
} from "../../store/reducers/userSlice";
import { getUserListColums } from "../utils/userListColums";
//import { DELETE_USER_RESET } from "../../constants/userConstanat";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profileData);

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
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
      navigate("/admin/users"); // Cambiado a navigate
      //dispatch({ type: DELETE_USER_RESET });
      dispatch(resetDelete()); // Cambiado a resetDelete
    }

    //dispatch(getAllUsers());
    dispatch(getUsers()); // Cambiado a getUsers
  }, [dispatch, error, deleteError, navigate, isDeleted, message]);

  // Handler para eliminar un usuario
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

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

  // Handler para controlar el toggle
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Users - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">TODOS LOS USUARIOS</h4>

                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
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
