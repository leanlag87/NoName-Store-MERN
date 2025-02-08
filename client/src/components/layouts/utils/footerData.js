import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

//Datos del menu
export const footMenu = [
  {
    id: 1,
    title: "Ayuda",
    menu: [
      {
        id: 1,
        link: "Seguimiento del Pedido",
        path: "/orders",
      },
      {
        id: 2,
        link: "Preguntas Frecuentes",
        path: "/terms/conditions",
      },

      {
        id: 3,
        link: "Cancelar Pedido",
        path: "/policy/return",
      },
      {
        id: 4,
        link: "Devolver Pedido",
        path: "/policy/return",
      },
      {
        id: 5,
        link: "Información de Garantía",
        path: "/policy/Terms",
      },
    ],
  },
  {
    id: 2,
    title: "Políticas",
    menu: [
      {
        id: 1,
        link: "Política de devoluciones",
        path: "/policy/return",
      },
      {
        id: 2,
        link: "Seguridad",
        path: "/policy/privacy",
      },
      {
        id: 3,
        link: "Mapa del sitio",
        path: "/policy/Terms",
      },
      {
        id: 4,
        link: "Política de privacidad",
        path: "/policy/privacy",
      },
      {
        id: 5,
        link: "T&C",
        path: "/terms/conditions",
      },
    ],
  },
  {
    id: 3,
    title: "Compañía",
    menu: [
      {
        id: 1,
        link: "Sobre nosotros",
        path: "/about",
      },
      {
        id: 2,
        link: "Contacta con nosotros",
        path: "/contact",
      },
      {
        id: 3,
        link: "Centros de Servicio",
        path: "/",
      },
      {
        id: 4,
        link: "Carreras",
        path: "/",
      },
      {
        id: 5,
        link: "Afiliados",
        path: "/terms/conditions",
      },
    ],
  },
];

//Enlaces e iconos a redes sociales
export const footSocial = [
  {
    id: 1,
    icon: <FacebookIcon className="facebook_icon" fontSize="large" />,
    path: "https://www.facebook.com/",
  },
  {
    id: 2,
    icon: <InstagramIcon className="insta_icon" fontSize="large" />,
    path: "https://www.instagram.com/",
  },
  {
    id: 3,
    icon: <TwitterIcon className="twitter_icon" fontSize="large" />,
    path: "https://twitter.com/",
  },
  {
    id: 4,
    icon: <LinkedInIcon className="likedin_icon" fontSize="large" />,
    path: "https://www.linkedin.com/",
  },
];
