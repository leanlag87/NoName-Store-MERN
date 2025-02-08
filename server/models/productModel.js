const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, introduce el nombre del producto"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Por favor, introduce la descripción del producto"],
  },
  price: {
    type: Number,
    required: [true, "Por favor, introduce el precio del producto"],
    maxLength: [8, "El precio no puede exceder los 8 dígitos"],
  },
  info: {
    type: String,
    required: [true, "Por favor, introduce información adicional del producto"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      product_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Por favor, introduce la categoría del producto"],
  },
  Stock: {
    type: Number,
    required: [true, "Por favor, introduce el stock del producto"],
    maxLength: [4, "El stock no puede exceder los 4 dígitos"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      recommend: {
        type: Boolean,
        default: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProductModel", productSchema);
