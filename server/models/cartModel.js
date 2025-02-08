const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "ProductModel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },

      price: {
        type: Number,
        required: true,
      },
      image: {
        //array de strings para permitir múltiples imágenes.
        type: [String],
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
