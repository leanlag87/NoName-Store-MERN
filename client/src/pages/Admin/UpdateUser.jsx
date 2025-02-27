import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  getUserAdmin,
  updateUserAdmin,
  clearErrors,
  resetUpdate,
} from "../../store/reducers/userSlice";
import * as UpdateUserStyles from "./Styles/UpdateUserStyles";
import { InputAdornment } from "@mui/material";

function UpdateUser() {
  // Redux y Router
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();

  //Estados de Redux
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user);

  //Estados del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  //Estado UI
  const [toggle, setToggle] = useState(false);

  // Controla la visibilidad de la barra lateral
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  //para cargar datos del usuario y manejar actualizaciones
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserAdmin(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Usuario actualizado con éxito");
      navigate("/admin/users");
      dispatch(resetUpdate());
    }
  }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUserAdmin({ id: userId, userData: myForm }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Actualizar Usuario" />
          <UpdateUserStyles.UpdateUserContainer>
            {/* Barra lateral */}
            <UpdateUserStyles.FirstBox className={!toggle ? "" : "toggle-box"}>
              <Sidebar />
            </UpdateUserStyles.FirstBox>
            {/* Contenido principal */}
            <UpdateUserStyles.SecondBox>
              {/* Barra de navegación */}
              <UpdateUserStyles.NavBarContainer>
                <Navbar toggleHandler={toggleHandler} />
              </UpdateUserStyles.NavBarContainer>
              {/* Sección de formulario */}
              <UpdateUserStyles.FormSection>
                <UpdateUserStyles.Form onSubmit={updateUserSubmitHandler}>
                  {/* Cabecera del formulario */}
                  <UpdateUserStyles.StyledAvatar>
                    <UpdateUserStyles.StyledAccountCircleIcon />
                  </UpdateUserStyles.StyledAvatar>
                  <UpdateUserStyles.Heading variant="h5" component="h1">
                    Actualizar Rol
                  </UpdateUserStyles.Heading>
                  {/* Campo de nombre */}
                  <UpdateUserStyles.NameInput>
                    <UpdateUserStyles.StyledTextField
                      variant="outlined"
                      fullWidth
                      label="Nombre de usuario"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </UpdateUserStyles.NameInput>
                  {/* Campo de email */}
                  <UpdateUserStyles.NameInput>
                    <UpdateUserStyles.StyledTextField
                      variant="outlined"
                      fullWidth
                      label="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <UpdateUserStyles.StyledMailOutlineIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </UpdateUserStyles.NameInput>
                  {/* Selector de rol */}
                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="role_field"
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        width: "300px",
                        color: "#414141",
                      }}
                    >
                      Rol*
                    </label>
                    <UpdateUserStyles.StyledSelect
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <UpdateUserStyles.StyledMenuItem value="" disabled>
                        <em style={{ background: "inherit", color: "#414141" }}>
                          Elija un rol
                        </em>
                      </UpdateUserStyles.StyledMenuItem>
                      <UpdateUserStyles.StyledMenuItem value="admin">
                        Admin
                      </UpdateUserStyles.StyledMenuItem>
                      <UpdateUserStyles.StyledMenuItem value="user">
                        Usuario
                      </UpdateUserStyles.StyledMenuItem>
                    </UpdateUserStyles.StyledSelect>
                  </div>
                  {/* Botón de actualización */}
                  <UpdateUserStyles.LoginButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={updateLoading || role === ""}
                  >
                    Actualizar
                  </UpdateUserStyles.LoginButton>
                </UpdateUserStyles.Form>
              </UpdateUserStyles.FormSection>
            </UpdateUserStyles.SecondBox>
          </UpdateUserStyles.UpdateUserContainer>
        </>
      )}
    </>
  );
}

export default UpdateUser;
