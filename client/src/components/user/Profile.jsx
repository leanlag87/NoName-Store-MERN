import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ExitToApp as LogoutIcon } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import "./Styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/reducers/userSlice";
import { toast } from "react-toastify";
import { formatCreatedAt } from "../../utils/dateFormatter";
import Loader from "../ui/Loader/Loader";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  // Para evitar errores si el usuario no esta definido aun
  const userCreatedAt = user ? formatCreatedAt(user) : "Fecha no disponible";

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success("Sesión cerrada con éxito");
    navigate("/login");
  };

  return (
    <div className="rootProfile">
      <div className="header-root">
        <Typography variant="h5" component="h1" className="headingProfile">
          Hola, {user.name}!
        </Typography>

        <Typography variant="body2" className="greeting">
          ¡Bienvenido de nuevo! ¡Felices compras!
        </Typography>
      </div>

      <div className="profileConatiner">
        <div className="leftCotainer">
          <h4 className="profileHeadingLeft">Descripción general del perfil</h4>
          <div className="profileSection">
            <Avatar
              alt={user.name}
              src={user.avatar.url}
              className="profileAvatar"
            />
            <div className="leftDetails">
              <h5 className="profileSubHeading">Nombre :</h5>
              <Typography className="profileText">{user.name}</Typography>
              <h5 className="profileSubHeading">Email :</h5>
              <Typography className="profileText">{user.email}</Typography>
              <h5 className="profileSubHeading">Miembro desde :</h5>
              <Typography className="profileText">{userCreatedAt}</Typography>
            </div>
          </div>

          <div className="myOrder">
            <Typography variant="h4" component="h1" className="profileHeading">
              Compras
            </Typography>
            <Button
              component={Link}
              to="/orders"
              variant="contained"
              className="ordersButton"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Compras
            </Button>
          </div>
        </div>

        <div className="rightConatiner">
          <div className="righHeadings">
            <Typography variant="h4" component="h1" className="profileHeading">
              información Personal
            </Typography>
            <Typography className="profileText2">
              Hola! No dudes en editar cualquiera de tus datos para que tu
              cuenta este actualizada.
            </Typography>
          </div>
          <div className="profileDetials">
            <div className="detials">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
              >
                Mis Detalles
              </Typography>
              <Typography className="profileText">
                {user.name} {user.lastName}
              </Typography>
              <Typography className="profileText">{user.email}</Typography>
              <Typography className="profileText">
                Numero de Telefono
              </Typography>
              <Typography className="profileText">Genero</Typography>
            </div>
            {/* <Link to="/profile/update" style={{ textDecoration: "none" }}>
            <Button variant="contained" className="profileButton"> */}
            <Button
              component={Link}
              to="/profile/update"
              variant="contained"
              className="profileButton"
              style={{ textDecoration: "none" }}
            >
              Editar Dellates
            </Button>
            <div className="detials">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
                style={{ marginTop: "1.5rem" }}
              >
                DETALLES DE INICIO DE SESIÓN
              </Typography>
              <Typography className="profileSubHeading">EMAIL</Typography>
              <Typography className="profileText">{user.email}</Typography>

              <Typography
                className="profileSubHeading"
                style={{ marginTop: "10px" }}
              >
                Contraseña
              </Typography>
              <Typography className="profileSubHeading">
                *************
              </Typography>
            </div>
            <Button
              component={Link}
              to="/password/update"
              variant="contained"
              className="profileButton"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Modificar Contraseña
            </Button>
            <div className="mangeAccount">
              <Typography
                variant="h4"
                component="h1"
                className="profileHeading"
              >
                Cerrar sesión en todos los dispositivos
              </Typography>

              <p className="profileText3">
                Para acceder nuevamente al sitio web de NoName-Store, debes
                proporcionar sus credenciales. Esta acción cerrará tu sesión en
                cualquier otros navegadores web que hayas utilizado antes.
              </p>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="profileButton"
              startIcon={<LogoutIcon />}
              onClick={logoutHandler}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
