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
//import PrivateRoute from "./PrivateRoute";
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

// const Admin = () => {
//   return (
//     <Router>
//       <Routes>
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/dashboard"
//           element={<Dashboard />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/products"
//           element={<ProductList />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/product/:id"
//           element={<UpdateProduct />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/reviews"
//           element={<ProductReviews />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/orders"
//           element={<OrderList />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/order/:id"
//           element={<ProcessOrder />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/new/product"
//           element={<NewProduct />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/users"
//           element={<UserList />}
//         />
//         <PrivateRoute
//           isAdmin={true}
//           path="/admin/user/:id"
//           element={<UpdateUser />}
//         />
//       </Routes>
//     </Router>
//   );
// };

export default Admin;
