const express = require("express");
const orderController = require("../controllers/orderController");
const { authUser } = require("../middlewares/authUserMiddleware");
const mdAdmin = require("../middlewares/adminMiddleware");

const api = express.Router();

api.post("/order/new", authUser, orderController.newOrder);
api.get("/order/:id", authUser, orderController.getSingleOrder);
api.get("/orders/me", authUser, orderController.myOrders);
api.get(
  "/admin/orders",
  authUser,
  mdAdmin.isAdmin,
  orderController.getAllOrders
);
api.put(
  "/admin/order/:id",
  authUser,
  mdAdmin.isAdmin,
  orderController.updateOrder
);

api.delete(
  "/admin/order/:id",
  authUser,
  mdAdmin.isAdmin,
  orderController.deleteOrder
);

module.exports = api;
