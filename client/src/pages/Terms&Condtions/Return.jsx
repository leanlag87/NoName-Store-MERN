import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Return.css";
import MetaData from "../../components/ui/MetaData/MetaData";
import TermsImage from "../../assets/about/TCPD.jpg";

const ReturnPolicyPage = () => {
  return (
    <div className="container__0">
      <MetaData title="Return Policy" />
      <div className="image-container">
        <img src={TermsImage} alt="Background" />
        <h1 className="policy-text">POLÍTICA DE DEVOLUCIONES</h1>
      </div>
      <div className="content-container">
        <p>
          ¡Gracias por comprar en NoName-Store! Queremos asegurarnos de que
          estés completamente satisfecho con cada compra. Si no estás
          completamente satisfecho con tu compra, ofrecemos una política de
          devolución de 30 días para la mayoría de los productos y de 7 días
          para productos seleccionados.
        </p>
        <p>
          Para poder devolver el artículo, este debe estar sin usar, en su
          embalaje original y en las mismas condiciones en las que lo recibió.
          También deberá proporcionar un comprobante de compra. Tenga en cuenta
          que es posible que algunos artículos, como productos personalizados o
          hechos a medida, no sean elegibles para devolución a menos que exista
          un defecto o error de nuestra parte.
        </p>
        <p>
          Si desea iniciar una devolución, comuníquese con nuestro Departamento
          de Atención al Cliente dentro del período de devolución especificado.
          Nuestro equipo lo guiará a través del proceso de devolución y le
          proporcionará las instrucciones necesarias y la dirección de
          devolución.
        </p>
        <p>
          Una vez que recibamos el artículo devuelto y verifiquemos su estado,
          procesaremos el reembolso al método de pago original utilizado para la
          compra. Espere hasta [número de días] para que el reembolso se refleje
          en su cuenta.
        </p>
        <p>
          Tenga en cuenta que los costos de envío de devolución corren por
          cuenta del cliente, a menos que la devolución se deba a un defecto o
          error de nuestra parte. Recomendamos utilizar un método de envío
          rastreable para garantizar la entrega segura y oportuna de su
          devolución.
        </p>
        <p>
          Si tiene alguna pregunta o necesita más ayuda con respecto a nuestra
          política de devoluciones, no dude en ponerse en contacto con nuestro
          Departamento de Atención al Cliente. ¡Estamos aquí para ayudar!
        </p>
        <h2>Información del contacto:</h2>
        <p>
          Departamento de Atención al Cliente
          <br />
          <span style={{ fontWeight: "500" }}>Email </span>: soporte@test.dev
          <br />
          <span style={{ fontWeight: "500" }}>Telefono </span>: 123-456-7890
          <br />
          <span style={{ fontWeight: "500" }}>
            {" "}
            Horario de atención: de Lunes a Viernes de 9:00 a 17:00 horas. (GMT){" "}
          </span>
        </p>
        <p>
          Comuníquese con nosotros si tiene alguna inquietud o necesita alguna
          aclaración con respecto a nuestros{" "}
          <Link
            to="/policy/return"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "500",
            }}
          >
            Política de devoluciones
          </Link>
          Nos esforzamos por brindar un excelente servicio al cliente y
          garantizar su satisfacción.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
