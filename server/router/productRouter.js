const express = require("express");

const productController = require("../controllers/productController");

const upload = require("../middlewares/multerConfig");

//Creo el router
const api = express.Router();

//Importo el middleware
const { authUser } = require("../middlewares/authUserMiddleware");

//Rutas
api.post(
  "/products",
  authUser,
  upload.array("images"),
  productController.createProduct
); //Ruta para crear un nuevo producto (solo usuarios autenticados)
api.get("/products", productController.getAllProducts); // Ruta para obtener todos los productos
api.get("/products/:id", productController.getProductDetails); // Ruta para obtener los detalles de un producto específico
api.put("/products/:id", authUser, productController.updateProduct); // Ruta para actualizar un producto existente
api.delete("/products/:id", authUser, productController.deleteProduct); // Ruta para eliminar un producto existente
api.put(
  "/products/:productId/reviews",
  authUser,
  productController.createProductReview
); // Ruta para crear una reseña de un producto
api.get("/products/:productId/reviews", productController.getProductReviews); // Ruta para obtener todas las reseñas de productos
api.delete(
  "/products/:productId/reviews/:reviewId",
  authUser,
  productController.deleteProductReview
); // Ruta para eliminar una reseña de un producto

module.exports = api;
