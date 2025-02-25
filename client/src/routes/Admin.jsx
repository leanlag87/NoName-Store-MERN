//Componente para ruta de administradores
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import ProductList from "../pages/Admin/ProductList";
import OrderList from "../pages/Admin/OrderList";
import UserList from "../pages/Admin/UserList";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import ProcessOrder from "../pages/Admin/ProcessOrder";
import UpdateUser from "../pages/Admin/UpdateUser";
import NewProduct from "../pages/Admin/NewProduct";
import ProductReviews from "../pages/Admin/ProductReview";
import AdminRoute from "./AdminRoute";

const Admin = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="products"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />
      <Route
        path="product/:id"
        element={
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        }
      />
      <Route
        path="reviews"
        element={
          <AdminRoute>
            <ProductReviews />
          </AdminRoute>
        }
      />
      <Route
        path="orders"
        element={
          <AdminRoute>
            <OrderList />
          </AdminRoute>
        }
      />
      <Route
        path="order/:id"
        element={
          <AdminRoute>
            <ProcessOrder />
          </AdminRoute>
        }
      />
      <Route
        path="new/product"
        element={
          <AdminRoute>
            <NewProduct />
          </AdminRoute>
        }
      />
      <Route
        path="users"
        element={
          <AdminRoute>
            <UserList />
          </AdminRoute>
        }
      />
      <Route
        path="user/:id"
        element={
          <AdminRoute>
            <UpdateUser />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default Admin;
