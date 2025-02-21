// Este archivo contendrá las rutas de las páginas que verán los usuarios de tu aplicación. Por ejemplo, la página de inicio, la página de productos, la página de detalles de un producto, etc.
//Rutas para los usuarios
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser } from "../store/reducers/userSlice";
import { initializeMercadoPago } from "../utils/mercadoPago";
import { toast } from "react-toastify";
import Header from "../components/layouts/Header/Header";
import Footer from "../components/layouts/Footer/Footer";
import Services from "../pages/Terms&Condtions/Service";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/Products/ProductDetails";
import Products from "../pages/Products/Products";
import Shipping from "../components/cart/Shipping";
import Cart from "../components/cart/Cart";
import ConfirmOrder from "../components/cart/CorfimOrder";
import Payment from "../components/cart/Payment";
import OrderSuccess from "../components/cart/OrderSuccess";
import MyOrder from "../pages/Order/MyOrder";
import ContactForm from "../pages/Terms&Condtions/Contact";
import AboutUsPage from "../pages/Terms&Condtions/Aboutus";
import ReturnPolicyPage from "../pages/Terms&Condtions/Return";
import TermsUse from "../pages/Terms&Condtions/TermsAndUse";
import TermsAndConditions from "../pages/Terms&Condtions/TermsCondtion";
import PrivacyPolicy from "../pages/Terms&Condtions/Privacy";
import Signup from "../components/user/SingUp";
import Login from "../components/user/Login";
import ProfilePage from "../components/user/Profile";
import PrivateRoute from "./PrivateRoute";
import UpdatePassword from "../components/user/UpdatePassword";
import ForgetPassword from "../components/user/ForgetPassword";
import ResetPassword from "../components/user/ResetPassword";
import UpdateProfile from "../components/user/UpdateProfile";

function Users() {
  const location = useLocation();
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setIsAdminRoute(true);
    } else {
      setIsAdminRoute(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(loadUser()); // Carga el usuario
    initializeMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY); // Inicializa Mercado Pago
  }, [dispatch]);

  useEffect(() => {
    if (
      error &&
      error !== "No autorizado" &&
      error !== "Error al cargar usuario"
    ) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {isAdminRoute ? null : <Header />} {/* Contenedor principal */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/password/forgot" element={<ForgetPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/policy/return" element={<ReturnPolicyPage />} />
        <Route exact path="/policy/Terms" element={<TermsUse />} />
        <Route exact path="/policy/privacy" element={<PrivacyPolicy />} />
        <Route
          exact
          path="/terms/conditions"
          element={<TermsAndConditions />}
        />
        <Route exact path="/contact" element={<ContactForm />} />
        <Route exact path="/about_us" element={<AboutUsPage />} />
        <Route
          exact
          path="/account"
          element={
            <>
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            </>
          }
        />
        <Route
          exact
          path="/profile/update"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <PrivateRoute>
              <MyOrder />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/shipping"
          element={
            <PrivateRoute>
              <Shipping />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <PrivateRoute>
              <ConfirmOrder />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
      </Routes>
      <Services />
      <Footer />
    </>
  );
}

export default Users;
