const express = require("express");
const PaymentController = require("../controllers/paymentController");
const { authUser } = require("../middlewares/authUserMiddleware");

//Creo el router
const api = express.Router();

//Rutas
api.get("/mercadopagoapikey", PaymentController.getMercadoPagoApiKey);
api.post("/payment", authUser, PaymentController.createPreference);
api.post("/webhook", PaymentController.webhook);

module.exports = api;
