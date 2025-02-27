import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../store/reducers/orderSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import OrderDetailsSection from "../../components/cart/OrderDetails";
import { resetUpdate } from "../../store/reducers/orderSlice";
import * as ProcessOrderStyles from "./Styles/ProcessOrderStyles";

function ProcessOrder() {
  // Estados de Redux
  const dispatch = useDispatch();

  // Obtenemos todos los estados del slice "order"
  const { order, error, loading } = useSelector((state) => state.order);
  const {
    isUpdated,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.order);

  // Obtenemos el ID de la orden de los parámetros de la URL
  const params = useParams();
  const orderId = params.id;

  // Estados locales
  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

  // Controlador para mostrar/ocultar la barra lateral
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  //para manejar errores, actualizaciones y cargar detalles de la orden
  useEffect(() => {
    // Manejo de errores
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // Manejo de errores de actualización
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    // Si la orden se actualiza exitosamente
    if (isUpdated) {
      toast.success("Pedido actualizado exitosamente");
      dispatch(resetUpdate());
    }
    // Cargamos los detalles de la orden
    dispatch(getOrderDetails(orderId));
  }, [dispatch, error, isUpdated, updateError, orderId]);

  // Manejador para enviar la actualización de la orden
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    // Enviamos la actualización de la orden al backend como objeto FormData
    dispatch(updateOrder({ id: orderId, orderData: myForm }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <ProcessOrderStyles.ProcessOrderContainer>
            {/* Sidebar de navegación */}
            <ProcessOrderStyles.FirstBox
              className={!toggle ? "" : "toggle-box"}
            >
              <Sidebar />
            </ProcessOrderStyles.FirstBox>
            {/* Contenido principal */}
            <ProcessOrderStyles.SecondBox>
              <ProcessOrderStyles.NavBarContainer>
                <Navbar toggleHandler={toggleHandler} />
              </ProcessOrderStyles.NavBarContainer>
              <ProcessOrderStyles.MainInfo>
                {/* Sección de detalles de la orden */}
                <ProcessOrderStyles.OrderDetailsContainer>
                  <ProcessOrderStyles.ShippingHeading variant="h5">
                    DETALLES DEL PEDIDO DEL USUARIO
                  </ProcessOrderStyles.ShippingHeading>
                  {order.orderItems &&
                    order.orderItems.map((item, idx) => (
                      <Link
                        to={`/product/${item.productId}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          textDecorationColor: "none",
                        }}
                        key={idx}
                      >
                        <OrderDetailsSection
                          item={item}
                          totalDiscount={`$${
                            (item.price * item.quantity * 20) / 100
                          }`} // random discount between 1 to 30
                          totalPrice={`$${item.price * item.quantity}`}
                        />
                      </Link>
                    ))}
                </ProcessOrderStyles.OrderDetailsContainer>
                {/* Sección de dirección de envío */}
                <ProcessOrderStyles.ShippingDetailsContainer>
                  <ProcessOrderStyles.OrderSubHeading variant="h6">
                    DIRECCIÓN DE ENTREGA
                  </ProcessOrderStyles.OrderSubHeading>

                  <ProcessOrderStyles.ShippingAddressContainer>
                    <ProcessOrderStyles.ShippingAddressDetails>
                      {/* Datos del usuario y dirección */}
                      <ProcessOrderStyles.StyledTypography
                        variant="subtitle2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        {order.user && order.user.name}
                      </ProcessOrderStyles.StyledTypography>
                      <ProcessOrderStyles.StyledTypography
                        variant="subtitle2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </ProcessOrderStyles.StyledTypography>

                      <ProcessOrderStyles.StyledTypography
                        variant="subtitle2"
                        style={{
                          fontWeight: 400,
                          marginTop: "-5px",
                          fontSize: "16px",
                        }}
                      >
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </ProcessOrderStyles.StyledTypography>

                      <ProcessOrderStyles.StyledTypography
                        variant="subtitle2"
                        style={{
                          fontWeight: 400,
                          fontSize: "16px",
                        }}
                      >
                        {order.user && order.user.email}
                      </ProcessOrderStyles.StyledTypography>
                    </ProcessOrderStyles.ShippingAddressDetails>
                  </ProcessOrderStyles.ShippingAddressContainer>
                </ProcessOrderStyles.ShippingDetailsContainer>

                <ProcessOrderStyles.BoldDivider />
                {/* Sección de resumen de precio */}
                <ProcessOrderStyles.TotalPriceContainer>
                  <ProcessOrderStyles.OrderSummaryItem>
                    <div>
                      <ProcessOrderStyles.TotalPriceH4>
                        Precio Total
                      </ProcessOrderStyles.TotalPriceH4>

                      <ProcessOrderStyles.StyledTypography
                        style={{
                          fontSize: "14px",
                          marginTop: "-10px",
                          color: "#414141",
                        }}
                      >
                        (Inclusive de todos los impuestos)
                      </ProcessOrderStyles.StyledTypography>
                    </div>
                    <ProcessOrderStyles.TotalPriceP>
                      <b style={{ marginLeft: "-2rem" }}>
                        ${order.totalPrice && order.totalPrice}
                      </b>
                    </ProcessOrderStyles.TotalPriceP>
                  </ProcessOrderStyles.OrderSummaryItem>
                </ProcessOrderStyles.TotalPriceContainer>
                {/* Sección de estado del pedido */}
                <ProcessOrderStyles.TotalPriceContainer>
                  <ProcessOrderStyles.OrderSummaryItem>
                    <div>
                      <ProcessOrderStyles.TotalPriceH4>
                        Estado del pedido
                      </ProcessOrderStyles.TotalPriceH4>
                    </div>
                    <ProcessOrderStyles.RedFont
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      <b>{order.orderStatus && order.orderStatus}</b>
                    </ProcessOrderStyles.RedFont>
                  </ProcessOrderStyles.OrderSummaryItem>
                </ProcessOrderStyles.TotalPriceContainer>
                {/* Sección de estado del pago */}
                <ProcessOrderStyles.TotalPriceContainer>
                  <ProcessOrderStyles.OrderSummaryItem>
                    <div>
                      <ProcessOrderStyles.TotalPriceH4>
                        Estado del pago
                      </ProcessOrderStyles.TotalPriceH4>
                    </div>
                    <ProcessOrderStyles.GreenFont>
                      <b>
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </b>
                    </ProcessOrderStyles.GreenFont>
                  </ProcessOrderStyles.OrderSummaryItem>
                </ProcessOrderStyles.TotalPriceContainer>
                {/* Formulario de actualización de estado */}
                {order.orderStatus && (
                  <>
                    <div
                      style={{
                        display:
                          order.orderStatus === "Delivered" ? "none" : "block",
                        padding: " 0 1rem 0 0",
                      }}
                    >
                      <ProcessOrderStyles.BoldDivider />
                      <ProcessOrderStyles.UpdateOrderForm
                        onSubmit={updateOrderSubmitHandler}
                      >
                        <h1>Orden de proceso</h1>

                        <div style={{ marginTop: "-1rem" }}>
                          <ProcessOrderStyles.StyledAccountTreeIcon />
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            defaultValue={order.orderStatus || ""}
                          >
                            <option value="">Elija una categoría</option>
                            {order.orderStatus === "Processing" && (
                              <option value="Shipped">Enviado</option>
                            )}
                            {order.orderStatus === "Shipped" && (
                              <option value="Delivered">Entregado</option>
                            )}
                          </select>
                        </div>

                        <ProcessOrderStyles.PlaceOrderBtn
                          variant="contained"
                          fullWidth
                          disabled={
                            updateLoading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          Proceso
                        </ProcessOrderStyles.PlaceOrderBtn>
                      </ProcessOrderStyles.UpdateOrderForm>
                    </div>
                  </>
                )}
              </ProcessOrderStyles.MainInfo>
            </ProcessOrderStyles.SecondBox>
          </ProcessOrderStyles.ProcessOrderContainer>
        </>
      )}
    </>
  );
}

export default ProcessOrder;
