const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // order shiping address
  shippingInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },

  // order item details array
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },
      //Solucione un problema con la respuesta en insomania , antes estaba como "productId" y daba en error que el id era incorrecto
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "ProductModel",
        required: true,
      },
    },
  ],

  // user who orderd
  user: {
    type: mongoose.Schema.ObjectId,
    //Cambiado xq ,me estaba dando problemas para obtener los pedidos con getsinglorder , estaba asi("userModel")
    ref: "User",
    required: true,
  },
  // payment status of product :
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paymentMethod: {
      // Nuevo campo: método de pago
      type: String,
      required: true,
    },
    paymentDetails: {
      // Nuevo campo para información adicional (opcional)
      type: String,
    },
  },
  // payment timing
  paidAt: {
    type: Date,
    required: true,
    default: Date.now, // Si el pago se realiza al crear el pedido
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  // total price will some of all of three above
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  // order pending or delilverd or confirm
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Ejemplo de enum
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orderModel", orderSchema);
