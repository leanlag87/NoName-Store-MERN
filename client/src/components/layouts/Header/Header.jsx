import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, clearErrors } from "../../../store/reducers/userSlice";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReorderIcon from "@mui/icons-material/Reorder";
import { toast } from "react-toastify";
import "../Styles/Header.css";

import SearchBar from "./SearchBar";
import SideBar from "./Sidebar";
import CartIcon from "./CartIcon";
import ProfileModel from "./ProfileModal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //navegar entre las rutas
  const { error } = useSelector((state) => state.user); //obtener el estado de error
  const { isAuthenticated, user } = useSelector((state) => state.user); //obtener el estado de autenticación del usuario
  const [searchBarActive, setSearchBarActive] = useState(false); //estado de la barra de búsqueda
  const [sideMenu, setSideMenu] = useState(false); //estado del menú lateral
  const [searchValue, setSearchValue] = useState(""); //estado del valor de búsqueda

  // función para cerrar sesión
  const handleCrossButtonClick = async () => {
    await dispatch(logoutUser());
    navigate("/"); //redirigir a la página de inicio
  };

  useEffect(() => {
    if (error) {
      toast.error(error); //mostrar una alerta si hay un error
      dispatch(clearErrors()); //limpiar el estado de error
    }
  }, [error, dispatch]);

  // sirve para abrir y cerrar el menú lateral
  const handleSideBarMenu = () => {
    setSideMenu(!sideMenu);
  };

  // sirve para abrir y cerrar la barra de búsqueda
  const handleSearchButtonClick = () => {
    setSearchBarActive(!searchBarActive);
  };

  // sirve para manejar el valor de búsqueda
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // sirve para manejar la búsqueda de productos y redirigir a la página de productos
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products/${searchValue}`);
    } else {
      navigate("/products");
    }
  };

  // sirve para cerrar sesión y limpiar los errores
  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(clearErrors()); // limpia los errores al cerrar sesión
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <div className="headerTop">
          <div className="headerTopLeft">
            <p>Envíos gratuitos</p>
          </div>
          <div className="headerTopRight">
            <div className="headerRetailer">
              <span>
                <LocationOnIcon className="headerRetailer_Svg" />
              </span>
              <span>Ubicación</span>
            </div>
            <div className="headerLogin">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button>Mi Cuenta</button>
                </Link>
              ) : (
                <Link
                  to="/signup"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button>Registrarse</button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* nav */}
        <div className="headerBottom">
          <div className="headerBottomLogo">
            <div className="headerMobileMenu">
              <span>
                <ReorderIcon
                  onClick={() => setSideMenu(!sideMenu)}
                  sx={{
                    fontSize: 29,
                    color: "black",
                    "&:hover": {
                      color: "#e7070f",
                      cursor: "pointer",
                    },
                  }}
                />
                {sideMenu && (
                  <SideBar
                    handleSideBarMenu={handleSideBarMenu}
                    isAuthenticated={isAuthenticated}
                    user={user}
                  />
                )}
              </span>
              <span>
                <SearchBar
                  searchBarActive={searchBarActive}
                  searchValue={searchValue}
                  handleCrossButtonClick={handleCrossButtonClick}
                  handleSearchButtonClick={handleSearchButtonClick}
                  handleSearchInputChange={handleSearchInputChange}
                  handleSearchFormSubmit={handleSearchFormSubmit}
                />
              </span>
            </div>
          </div>

          {!searchBarActive && (
            <Link to="/">
              <img
                src={require("../../../assets/NoNameLogo.png")}
                alt="logo"
                className="headerBottom__logo_main"
              />
            </Link>
          )}
          {/* navmenu */}
          {!searchBarActive && (
            <div className="headerBottomNavMenu">
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>

                <li>
                  <Link to="/products">Productos</Link>
                </li>
                <li>
                  <Link to="/contact">Contacto</Link>
                </li>
                <li>
                  <Link to="/about_us">Sobre Nosotros</Link>
                </li>
              </ul>
            </div>
          )}

          {/* iconos */}

          <div className="headerBottomIcons">
            <div className="searchBar">
              <SearchBar
                searchBarActive={searchBarActive}
                searchValue={searchValue}
                handleCrossButtonClick={handleCrossButtonClick}
                handleSearchButtonClick={handleSearchButtonClick}
                handleSearchInputChange={handleSearchInputChange}
                handleSearchFormSubmit={handleSearchFormSubmit}
              />
            </div>
            <span>
              <Link
                to="/cart"
                style={{ color: "none", textDecoration: "none" }}
              >
                <CartIcon />
              </Link>
            </span>
            <span>
              <ProfileModel
                user={user}
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
