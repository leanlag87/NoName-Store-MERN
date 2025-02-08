import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_3d from "highcharts-3d";
import { getProducts, clearErrors } from "../../store/reducers/productSlice";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import { getAllOrders } from "../../store/reducers/orderSlice";
import { getUsers } from "../../store/reducers/userSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import ProductImg from "../../assets/admin/products.png";
import ordersImg from "../../assets/admin/order.png";
import usersImg from "../../assets/admin/user.png";
import * as DashboardStyles from "./Styles/DashboardStyles";
import { getLineOptions, getDoughnutOptions } from "../utils/chartOptions";

// Inicializar Highcharts3D
HC_3d(Highcharts);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector(
    (state) => state.allOrders
  );
  const { users, error: usersError } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products &&
    products.forEach((element) => {
      // check how much items out of stocks in products array
      if (element.stock === 0) {
        outOfStock += 1;
      }
    });

  // total Amount Earned
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // Generamos las opciones usando las funciones importadas
  const lineOptions = getLineOptions(totalAmount);
  const doughnutOptions = getDoughnutOptions(products, outOfStock);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    if (usersError) {
      toast.error(usersError);
      dispatch(clearErrors);
    }
    if (ordersError) {
      toast.error(ordersError);
      dispatch(clearErrors);
    }

    dispatch(getAllOrders());
    dispatch(getUsers());
    dispatch(getProducts());
  }, [dispatch, error, ordersError, usersError]);

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
                  image={ProductImg}
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
