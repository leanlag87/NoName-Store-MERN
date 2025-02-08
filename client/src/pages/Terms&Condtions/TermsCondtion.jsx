import React from "react";
import "./Styles/TermsAndCondtion.css";
import MetaData from "../../components/ui/MetaData/MetaData";
import TermsImage from "../../assets/about/TCPD.jpg";

const TermsAndConditionsPage = () => {
  return (
    <div className="terms-container">
      <MetaData title="Terms and Conditions" />
      <img
        src={TermsImage}
        alt="Terms and Conditions"
        className="terms-image"
      />
      <div className="terms-overlay">
        <h1 className="terms-title">TÉRMINOS Y CONDICIONES</h1>
      </div>
      <div className="terms-content">
        <p>
          ¡Gracias por comprar en NoName-Store! Agradecemos su preferencia y su
          interés en nuestros productos. Queremos asegurarnos de que tenga una
          buena experiencia de compra en nuestro sitio web.
        </p>
        <p>
          Al realizar un pedido y comprar un producto en nuestro sitio web,
          usted acepta los siguientes términos y condiciones, junto con nuestras
          políticas de devolución y garantía, política de privacidad y términos
          de uso. Lea todo detenidamente y con atención para estar informado
          sobre sus derechos y obligaciones.
        </p>
        <h2>Aceptación de estos términos</h2>
        <p>
          Usted (“Cliente”) puede realizar pedidos de Productos con NoName-Store
          (“nosotros”, “nuestro”) a través de nuestro sitio web o, en
          determinadas circunstancias, por teléfono. Al realizar un pedido,
          usted acepta estos Términos y Condiciones de Venta (“Términos”) y
          reconoce que le proporcionaremos los Productos sujetos a estos
          Términos. Cualquier término o condición en cualquier pedido u otro
          formulario o correspondencia que sea incompatible con estos Términos
          será inaplicable y no tendrá fuerza ni efecto alguno, a menos que
          NoName-Store lo acepte expresamente por escrito.
        </p>
        <h2>Pedidos</h2>
        <p>
          Todos los pedidos están sujetos a la aceptación de NoName-Store.
          Podemos negarnos a aceptar, cancelar o limitar cualquier pedido o
          cantidad de pedido por cualquier motivo, incluso después de que se
          haya enviado una confirmación de pedido. Si cancelamos un pedido
          después de que se le haya cobrado, le reembolsaremos el importe
          cobrado.
        </p>
        <h2>Productos en oferta</h2>
        <p>
          Todas las descripciones de productos en nuestro sitio web están
          sujetas a cambios sin previo aviso a nuestra exclusiva discreción. Nos
          reservamos el derecho de cambiar o discontinuar un producto en
          cualquier momento. Si bien hacemos todo lo posible para mostrar los
          colores y las imágenes de los productos con precisión, no podemos
          garantizar que la pantalla de su dispositivo sea un reflejo exacto del
          artículo físico.
        </p>
        <h2>Precio</h2>
        <p>
          Todos los precios están sujetos a cambios hasta que NoName-Store
          acepte su pedido. Los precios que se muestran en el sitio web no
          incluyen los gastos de envío, que se calculan y se muestran en función
          de la opción de envío seleccionada durante el proceso de pago. Los
          precios que se muestran en el sitio web pueden diferir de los de las
          tiendas físicas que venden productos de NoName-Store. Nos reservamos
          el derecho de corregir errores de precios y notificarle cualquier
          cambio antes de continuar con su pedido.
        </p>
        <h2>Ofertas especiales</h2>
        <p>
          De vez en cuando, podemos ofrecer promociones especiales, incluidos
          descuentos, productos de edición limitada o envío gratuito. Estas
          ofertas están sujetas a cambios o interrupciones en cualquier
          momento..
        </p>
        <h2>Impuestos</h2>
        <p>
          Los precios cotizados para los Productos incluyen el Impuesto sobre
          Bienes y Servicios (IVA) vigente en el pais. El Cliente es responsable
          de pagar cualquier impuesto, excepto aquellos basados ​​en los
          ingresos de NoName-Store. Si NoName-Store debe recaudar y pagar
          impuestos en nombre del Cliente, podemos facturarle al Cliente dichos
          montos.
        </p>
        <h2>Pagos</h2>
        <p>
          Todos los pedidos deben pagarse en su totalidad antes del envío.
          Aceptamos pagos a través de MasterCard y Visa. La información de pago
          se envía al realizar un pedido y está sujeta a verificación y
          disponibilidad de fondos.
        </p>
        <h2>Envíos</h2>
        <p>
          Las opciones de envío disponibles se mostrarán durante el proceso de
          pago. Los plazos de envío proporcionados son estimaciones y no podemos
          garantizar fechas de entrega exactas. No nos hacemos responsables de
          las entregas tardías, pero si ya no necesita un artículo debido a una
          entrega tardía, comuníquese con nuestro Departamento de Atención al
          Cliente. Consulte nuestra política de devoluciones para conocer las
          opciones disponibles. Todo riesgo de pérdida o daño de los productos
          pasa a usted al tomar posesión física, y la propiedad pasa a usted
          cuando los productos son recogidos por el transportista.
        </p>
        <h2>Devoluciones</h2>
        <p>
          Una vez que se haya realizado y aceptado un pedido, no podrá
          cancelarlo sin el consentimiento por escrito de NoName-Store. Puede
          devolver los productos y obtener un reembolso del precio de compra
          (excluidos los gastos de envío iniciales) más los impuestos
          correspondientes. Los gastos de envío de devolución son
          responsabilidad del cliente. Los productos deben devolverse dentro de
          los treinta días posteriores a la compra.
        </p>
        <h2>Garantía</h2>
        <p>
          Para obtener información sobre la garantía, consulte la garantía
          escrita incluida con el producto o la página de garantía en nuestro
          sitio web.
        </p>
        <h2>No apto para reventa</h2>
        <p>
          Los productos que se venden en nuestro sitio web están destinados
          únicamente a clientes finales y no para su reventa. Nos reservamos el
          derecho de rechazar o cancelar cualquier pedido si sospechamos que se
          están comprando productos para su reventa.
        </p>
        <h2>Ley aplicable / Jurisdicción</h2>
        <p>
          Estos Términos se regirán e interpretarán de conformidad con las leyes
          del pais.
        </p>
        <h2>Resolución de disputas y ley aplicable</h2>
        <p>
          Cualquier disputa que surja de o esté relacionada con estos Términos
          se resolverá mediante las leyes del pais.
        </p>
        <h2>Indemnización</h2>
        <p>
          Usted acepta indemnizar y eximir a NoName-Store de toda
          responsabilidad por cualquier reclamo, costo, procedimiento, pérdida o
          demanda que surja de su incumplimiento de estos Términos o de
          cualquier persona que use su cuenta.
        </p>
        <h2>Acuerdo completo</h2>
        <p>
          Estos Términos constituyen el acuerdo completo entre NoName-Store y el
          Cliente, y reemplazan todos los acuerdos, representaciones, garantías
          y entendimientos anteriores o contemporáneos.
        </p>
        <h2>Divisibilidad</h2>
        <p>
          Si alguna disposición de estos Términos se considera inválida o
          inaplicable, las disposiciones restantes permanecerán en plena
          vigencia y efecto, y la disposición inválida o inaplicable se
          interpretará para dar el máximo efecto a la intención de las partes.
        </p>
        <h2>Exclusividad</h2>
        <p>
          Los derechos, obligaciones, responsabilidades y recursos con respecto
          a los Productos son exclusivamente aquellos expresados ​​en estos
          Términos. Las exenciones, liberaciones, limitaciones de
          responsabilidad y recursos expresados ​​en estos Términos se aplican
          incluso en caso de incumplimiento, negligencia, incumplimiento de
          contrato, responsabilidad estricta u otra causa de acción.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
