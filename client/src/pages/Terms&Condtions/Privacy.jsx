import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Privacy.css";
import MetaData from "../../components/ui/MetaData/MetaData";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <MetaData title={"Privacy Policy"} />
      <div className="container___">
        <h1>Política de privacidad de NoName-Store</h1>
        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          {" "}
          Fecha de vigencia: 23-12-2024
        </p>
        <p>
          En NoName-Store, valoramos la privacidad de nuestros clientes y
          estamos comprometidos a proteger su información personal. Esta
          Política de privacidad explica cómo recopilamos, usamos, divulgamos y
          salvaguardamos su información cuando utiliza nuestro sitio web y
          nuestros servicios. Lea esta Política de privacidad atentamente. Al
          acceder o utilizar nuestro sitio web y nuestros servicios, usted
          reconoce que ha leído, comprendido y acepta estar sujeto a todos los
          términos descritos en esta Política de privacidad.
        </p>
        <h2>1.Información que recopilamos</h2>
        <h3>1.1 Información personal:</h3>
        <p>
          Podemos recopilar información personal que nos proporcione
          voluntariamente cuando registre una cuenta, realice un pedido, se
          suscriba a nuestro boletín informativo, participe en concursos o
          encuestas o se comunique con nosotros para recibir asistencia. Esta
          información puede incluir su nombre, dirección de correo electrónico,
          número de teléfono, dirección de envío, dirección de facturación y
          detalles de pago.
        </p>
        <h3>1.2 Información no personal:</h3>
        <p>
          Cuando interactúa con nuestro sitio web, podemos recopilar información
          no personal sobre su dispositivo, acciones de navegación y patrones de
          uso. Esta información puede incluir su dirección IP, tipo de
          navegador, sistema operativo, URL de referencia e interacciones con
          nuestro sitio web.
        </p>
        <h2>2. Uso de la información</h2>
        <h3>2.1 Información personal:</h3>
        <p>Podemos utilizar la información personal que recopilamos para:</p>
        <ul>
          <li>Procesar y cumplir sus pedidos</li>
          <li>Brindar soporte al cliente y responder consultas.</li>
          <li>
            Enviarle ofertas promocionales, boletines informativos y
            comunicaciones de marketing (puede darse de baja en cualquier
            momento)
          </li>
          <li>Mejorar nuestro sitio web, productos y servicios.</li>
          <li>Personaliza tu experiencia en nuestro sitio web</li>
          <li>
            Prevenir actividades fraudulentas y garantizar la seguridad de
            nuestra plataforma
          </li>
        </ul>
        <h3>2.2 Información no personal:</h3>
        <p>
          Podemos utilizar información no personal para diversos fines,
          incluidos::
        </p>
        <ul>
          <li>Análisis de tendencias y comportamiento de los usuarios</li>
          <li>
            Monitorización y mejora de la funcionalidad de nuestro sitio web
          </li>
          <li>Personalización de contenidos y anuncios</li>
          <li>Generación de datos estadísticos agregados</li>
        </ul>
        <h2>3. Divulgación de información</h2>
        <p>
          Podemos divulgar su información a terceros en las siguientes
          circunstancias:
        </p>
        <ul>
          <li>
            A nuestros proveedores de servicios de confianza que nos ayudan a
            operar nuestro negocio y a brindarle servicios.
          </li>
          <li>
            Para cumplir con obligaciones legales, hacer cumplir nuestras
            políticas o responder a solicitudes legales
          </li>
          <li>
            En caso de fusión, adquisición o venta de la totalidad o parte de
            nuestros activos comerciales
          </li>
          <li>Con su consentimiento o según sus indicaciones</li>
        </ul>
        <h2>4. Seguridad</h2>
        <p>
          Tomamos medidas razonables para proteger su información de acceso,
          divulgación, alteración o destrucción no autorizados. Sin embargo,
          tenga en cuenta que ningún método de transmisión por Internet o
          almacenamiento electrónico es completamente seguro y no podemos
          garantizar una seguridad absoluta..
        </p>
        <h2>5. Privacidad para menores de edad</h2>
        <p>
          Nuestro sitio web y nuestros servicios no están destinados a niños
          menores de 13 años. No recopilamos deliberadamente información
          personal de niños. Si nos damos cuenta de que hemos recopilado
          información personal de un niño sin el consentimiento de sus padres,
          tomaremos medidas para eliminar esa información de nuestros
          servidores..
        </p>
        <h2>6. Cambios a esta Política de Privacidad</h2>
        <p>
          Es posible que actualicemos nuestra Política de privacidad de vez en
          cuando. Cualquier cambio se publicará en esta página y la Política de
          privacidad revisada entrará en vigencia inmediatamente después de su
          publicación. Le recomendamos que revise esta Política de privacidad
          periódicamente para conocer las actualizaciones o los cambios.
        </p>
        <h2>7. Contacta con nosotros</h2>
        <p>
          Si tiene alguna pregunta, inquietud o sugerencia con respecto a esta
          Política de privacidad, comuníquese con nosotros a{" "}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
            }}
          >
            [Insertar información de contacto]
          </Link>
        </p>
        <p>
          Al utilizar el sitio web y los servicios de NoName-Store, usted acepta
          la recopilación, el uso y la divulgación de su información como se
          describe en esta Política de privacidad..
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
