//Importamos Express
const express = require("express");
const authController = require("../controllers/authController");

const api = express.Router();

api.post("/authController/registerUser", authController.registerUser);
api.post("/authController/login", authController.login); // Ruta de login

module.exports = api;
