import React, { useState } from "react";
import { Link } from "react-router-dom";
import GooglePlay from "../../../assets/Footer/google-play-black.svg";
import AppStore from "../../../assets/Footer/app-store-black.svg";
import { toast } from "react-toastify";
import "../Styles/Footer.css";
import { footMenu, footSocial } from "../utils/footerData"; // Importamos los datos del menú y los enlaces a redes sociales para configurar el Footer

const Footer = () => {
  const [subValue, setSubValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubValue("");
    toast.success(
      "Gracias, estás suscrito para recibir nuestro boletín diario"
    );
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="wrapper_footer footer_wrapper ">
            <div className="foot_about foot1">
              <div className="foot_logo">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img
                    src={require("../../../assets/NoNameLogo.png")}
                    alt="NoNamelogo"
                  />
                  <h1 className="Foot_heading">NoName-Store</h1>
                </Link>
              </div>

              <div className="foot_subs">
                <h5>Boletín Informativo</h5>
                <form onSubmit={handleSubmit} className="foot_form">
                  <input
                    type="email"
                    className="input_field_footer"
                    placeholder="Correo Electrónico*"
                    required
                    value={subValue}
                    onChange={(e) => setSubValue(e.target.value)}
                  />
                  <p>
                    Al enviar su dirección de correo electrónico usted acepta
                    los{" "}
                    <Link to="/terms/conditions" className="foot_subs_text">
                      Terminos & Condiciones
                    </Link>
                  </p>
                  <button type="submit" className="btnFooter">
                    Subscribirse
                  </button>
                </form>
              </div>
            </div>

            <div className="foot_menu_container">
              {footMenu.map((item) => {
                const { id, title, menu } = item;
                return (
                  <div className="foot_menu foot2" key={id}>
                    <h4>{title}</h4>
                    <ul>
                      {menu.map((item) => {
                        const { id, link, path } = item;
                        return (
                          <li key={id}>
                            <Link to={path}>{link}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="foot_links foot3">
              <div className="foot_dowload_appLink">
                <h5>Download app</h5>
                <div className="app_links">
                  <span className="googlePlayStore_link">
                    <a href="/">
                      <img src={GooglePlay} alt="play Store svg" />
                    </a>
                  </span>
                  <span className="appleStore_link">
                    <a href="/">
                      <img src={AppStore} alt="Apple Store svg" />
                    </a>
                  </span>
                </div>
              </div>
              {/* socila media link */}

              <div className="foot_social">
                {footSocial.map((item) => {
                  const { id, icon, path } = item;
                  return (
                    <a
                      href={path}
                      key={id}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="separatorFooter"></div>

        <div className="sub_footer_root">
          <div className="container_Footer">
            <div className="sub_footer_wrapper">
              <div className="foot_policyLink">
                <ul>
                  <li className="subfoot_link_text1">
                    <Link to="/policy/privacy">
                      <p className="foot_policyLink_p">
                        Política de privacidad
                      </p>
                    </Link>
                  </li>
                  <li className="subfoot_link_text2">
                    <Link to="/terms/conditions">
                      <p className="foot_policyLink_p">
                        TERMINOS & CONDICIONES
                      </p>
                    </Link>
                  </li>
                  <li className="subfoot_link_text3">
                    <Link to="/policy/Terms">
                      <p className="foot_policyLink_p">CONDICIONES DE USO</p>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="foot_copyright">
                <p>
                  &copy; {currentYear} | NoName, Todos los derechos reservados
                  <span>
                    <a href="https://github.com/leanlag87">
                      {" "}
                      | Construido por leanlag87
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
