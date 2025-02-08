const express = require("express");
const cartController = require("../controllers/cartController");
const { authUser } = require("../middlewares/authUserMiddleware");

const api = express.Router();

api.post("/cart", authUser, cartController.addToCart); // Ruta protegida por authUser
api.get("/cart", authUser, cartController.getCart);
api.delete("/cart/:productId", authUser, cartController.removeFromCart);
api.put("/cart", authUser, cartController.updateCart);
api.delete("/cart", authUser, cartController.clearCart);

module.exports = api;
