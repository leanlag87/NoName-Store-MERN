// React y hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux actions
import { getProducts, clearErrors } from "../../store/reducers/productSlice";
import { getAllOrders } from "../../store/reducers/orderSlice";
import { getUsers } from "../../store/reducers/userSlice";

// Componentes
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Utilidades y estilos
import { toast } from "react-toastify";
import * as DashboardStyles from "./Styles/DashboardStyles";
import { getLineOptions, getDoughnutOptions } from "../utils/chartOptions";
import usersImg from "../../assets/admin/user.png";
import productImg from "../../assets/admin/products.png";
import ordersImg from "../../assets/admin/order.png";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
//import HC_3d from "highcharts-3d";

// Inicializar Highcharts3D
//HC_3d(Highcharts);

function Dashboard() {
  // -------- Hooks y estado --------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  // Selectores de Redux
  const { products, loading, error } = useSelector((state) => state.product);
  const { orders, error: ordersError } = useSelector((state) => state.order);
  const {
    isAuthenticated,
    users,
    error: usersError,
  } = useSelector((state) => state.user);
  const userData = users;

  // -------- Cálculos y variables derivadas --------
  // Calcular productos agotados
  let outOfStock = 0;
  products &&
    products.forEach((element) => {
      // Verifica que element sea válido y si el stock es 0
      if (element && element.stock === 0) {
        outOfStock += 1;
      }
    });

  // total de ingresos
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      // Verifica que item sea válido y suma el total de la orden
      if (item) {
        totalAmount += item.totalPrice;
      }
    });

  // Generamos las opciones usando las funciones importadas
  const lineOptions = getLineOptions(totalAmount);
  const doughnutOptions = products
    ? getDoughnutOptions(products, outOfStock)
    : {}; // Si product es válido, se generan las opciones

  // -------- Efectos y manejadores --------
  //Verificar autenticación y rol de administrador
  useEffect(() => {
    // Verifica si el usuario está autenticado y tiene rol de administrador
    if (!isAuthenticated) {
      toast.error("Por favor, inicia sesión primero");
      navigate("/login");
      return;
    }

    // Verifica si el token existe
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Sesión expirada, por favor inicia sesión nuevamente");
      navigate("/login");
      return;
    }

    // Verifica si el usuario tiene permisos de administrador
    if (userData.role !== "admin") {
      toast.error("Acceso denegado: Se requieren permisos de administrador");
      navigate("/");
      return;
    }

    // Si todo está bien, entonces carga los datos
    dispatch(getAllOrders());
    dispatch(getUsers());
    dispatch(getProducts());
  }, [dispatch, isAuthenticated, userData, navigate]);

  // Efecto para cargar datos y manejar errores
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (usersError) {
      toast.error(usersError);
      dispatch(clearErrors());
    }
    if (ordersError) {
      toast.error(ordersError);
      dispatch(clearErrors());
    }

    // dispatch(getAllOrders());
    // dispatch(getUsers());
    // dispatch(getProducts());
  }, [dispatch, error, ordersError, usersError]);

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // Se ejecuta cuando el ancho de la ventana cambia y el toggle está activo
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize); // Escucha el evento resize

    return () => {
      window.removeEventListener("resize", handleResize); // Elimina el evento
    };
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Dashboard - Admin Panel" />
          <DashboardStyles.DashboardContainer>
            <DashboardStyles.FirstBox className={!toggle ? "" : "toggle-box"}>
              <Sidebar />
            </DashboardStyles.FirstBox>

            <DashboardStyles.SecondBox>
              <DashboardStyles.NavBarContainer>
                <Navbar toggleHandler={toggleHandler} />
              </DashboardStyles.NavBarContainer>

              <DashboardStyles.SummaryCard>
                <DashboardStyles.CardContainer
                  image={productImg}
                  onClick={() => navigate("/admin/products")}
                >
                  <DashboardStyles.HeaderContent>
                    <DashboardStyles.StyledShoppingCart />

                    <DashboardStyles.Heading variant="h6">
                      Productos Totales
                    </DashboardStyles.Heading>
                  </DashboardStyles.HeaderContent>
                  <DashboardStyles.TextContainer>
                    <DashboardStyles.NumberText variant="body2">
                      {products && products.length}
                    </DashboardStyles.NumberText>
                  </DashboardStyles.TextContainer>
                </DashboardStyles.CardContainer>

                <DashboardStyles.CardContainer
                  image={ordersImg}
                  onClick={() => navigate("/admin/orders")}
                >
                  <DashboardStyles.HeaderContent>
                    <DashboardStyles.StyledAssignmentInd />
                    <DashboardStyles.Heading variant="h6">
                      Órdenes Totales
                    </DashboardStyles.Heading>
                  </DashboardStyles.HeaderContent>
                  <DashboardStyles.TextContainer>
                    <DashboardStyles.NumberText variant="body2">
                      {orders && orders.length}
                    </DashboardStyles.NumberText>
                  </DashboardStyles.TextContainer>
                </DashboardStyles.CardContainer>

                <DashboardStyles.CardContainer
                  image={usersImg}
                  onClick={() => navigate("/admin/users")}
                >
                  <DashboardStyles.HeaderContent>
                    <DashboardStyles.StyledPeople />
                    <DashboardStyles.Heading variant="h6">
                      Usuarios Totales
                    </DashboardStyles.Heading>
                  </DashboardStyles.HeaderContent>
                  <DashboardStyles.TextContainer>
                    <DashboardStyles.NumberText variant="body2">
                      {users && users.length}
                    </DashboardStyles.NumberText>
                  </DashboardStyles.TextContainer>
                </DashboardStyles.CardContainer>
              </DashboardStyles.SummaryCard>

              <DashboardStyles.Revenue>
                <DashboardStyles.DoughnutChartContainer>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={doughnutOptions}
                  />
                </DashboardStyles.DoughnutChartContainer>

                <DashboardStyles.RevenueContainer>
                  <DashboardStyles.HeaderContent>
                    <DashboardStyles.StyledBarChart />

                    <DashboardStyles.Heading variant="h6">
                      Ingresos Totales
                    </DashboardStyles.Heading>
                  </DashboardStyles.HeaderContent>
                  <DashboardStyles.TextContainer>
                    <DashboardStyles.NumberText variant="body2">
                      ${totalAmount.toFixed(2)}
                    </DashboardStyles.NumberText>
                  </DashboardStyles.TextContainer>
                </DashboardStyles.RevenueContainer>
              </DashboardStyles.Revenue>

              <DashboardStyles.LineChartContainer>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={lineOptions}
                />
              </DashboardStyles.LineChartContainer>
            </DashboardStyles.SecondBox>
          </DashboardStyles.DashboardContainer>
        </>
      )}
    </>
  );
}

export default Dashboard;
