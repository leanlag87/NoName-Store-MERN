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
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/product/:id"
        element={
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <AdminRoute>
            <ProductReviews />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <OrderList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/order/:id"
        element={
          <AdminRoute>
            <ProcessOrder />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/new/product"
        element={
          <AdminRoute>
            <NewProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/user/:id"
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
