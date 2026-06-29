const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middlewares/multerConfig");
const api = express.Router();
const { authUser } = require("../middlewares/authUserMiddleware");

api.post(
  "/products",
  authUser,
  upload.array("images"),
  productController.createProduct,
);
api.get("/products", productController.getAllProducts);
api.get("/products/:id", productController.getProductDetails);
api.put("/products/:id", authUser, productController.updateProduct);
api.delete("/products/:id", authUser, productController.deleteProduct);
api.put(
  "/products/:productId/reviews",
  authUser,
  productController.createProductReview,
);
api.get("/products/:productId/reviews", productController.getProductReviews);
api.delete(
  "/products/:productId/reviews/:reviewId",
  authUser,
  productController.deleteProductReview,
);

module.exports = api;
