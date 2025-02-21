const Order = require("../models/orderModel");
const Product = require("../models/productModel");
//const User = require("../models/usersModel");
const mongoose = require("mongoose");

//Crear un nuevo pedido
const newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(), //Se asume que el pago es inmediato. Adáptalo si usas una pasarela de pago.
      user: req.user._id,
    });

    // Actualizar el stock de los productos

    for (const item of orderItems) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({ message: "ID de producto inválido" });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      product.Stock -= item.quantity;

      if (product.Stock < 0) {
        throw new Error("Stock insuficiente para el producto");
      }

      await product.save();
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Obtener un solo pedido
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de pedido inválido" });
    }

    //const order = await Order.findById(id).populate("user", "name email");
    const order = await Order.findById(id).populate({
      path: "user", //especifica el campo a poblar (en este caso, user).
      select: "name email", //define explícitamente los campos que deseas incluir del modelo relacionado
      model: "User", // puedes especificar el nombre del modelo explícitamente
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Pedido no encontrado" });
    }

    // Verifica si el usuario que realiza la solicitud es el dueño del pedido o es un administrador
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para ver este pedido",
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error al obtener los detalles del pedido:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los detalles del pedido",
    });
  }
};

//Obtener todas las ordenes
const myOrders = async (req, res) => {
  //ESTA LOGICA TAMBIEN FUNCIONA, ANTES DE TERMINAR CON EL PROYECTO VERE CON CUAL ME QUEDO
  //   try {
  //     const orders = await Order.find({ user: req.user._id }).sort({
  //       createdAt: -1,
  //     }); //Obtener todos los pedidos que coincidan con el ID del usuario y ordenar por pedidos mas recientes

  //     res.status(200).json({
  //       success: true,
  //       orders,
  //     });
  //   } catch (error) {
  //     console.error("Error al obtener los pedidos del usuario:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Error al obtener los pedidos del usuario",
  //     });
  //   }
  try {
    // Obtén el ID del usuario autenticado desde el token
    const userId = req.user._id;

    // Busca todos los pedidos donde el campo "user" coincida con el usuario autenticado
    const orders = await Order.find({ user: userId }).populate({
      path: "user",
      select: "name email", // Solo traer estos campos del usuario si es necesario
    });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron pedidos para este usuario",
      });
    }

    // Respuesta con los pedidos del usuario autenticado
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error al obtener los pedidos del usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los pedidos del usuario",
    });
  }
};

//Funciones para el Admin
const getAllOrders = async (req, res) => {
  //ESTA LOGICA TAMBIEN FUNCIONA, DESPUES VERE CON CUAL ME QUEDO
  //   try {
  //     const orders = await Order.find();

  //     let totalAmount = 0; // Variable para calcular el total de ingresos

  //     orders.forEach((order) => {
  //       totalAmount += order.totalPrice;
  //     });

  //     res.status(200).json({
  //       success: true,
  //       totalAmount, // Total de ingresos
  //       orders,
  //     });
  //   } catch (error) {
  //     console.error("Error al obtener todos los pedidos:", error);
  //     res
  //       .status(500)
  //       .json({ success: false, message: "Error al obtener los pedidos" });
  //   }
  try {
    // Obtener todas las órdenes
    const orders = await Order.find().populate({
      path: "user",
      select: "name email", // Solo incluye el nombre y el correo del usuario
    });

    // Calcular el monto total generado por todas las órdenes
    const totalAmount = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      totalAmount,
      orders,
    });
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener todas las órdenes",
    });
  }
};

//Función auxiliar para actualizar el stock.
const updateStock = async (id, quantity) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error(
        "Producto no encontrado al actualizar el stock en updateOrder."
      );
    }

    product.Stock -= quantity;

    if (product.Stock < 0) {
      // Restaurar el stock si es necesario
      product.Stock += quantity;
      await product.save({ validateBeforeSave: false });

      throw new Error(
        "Stock insuficiente al enviar el pedido. Stock restaurado."
      );
    }

    await product.save({ validateBeforeSave: false });
  } catch (error) {
    console.error("Error al actualizar el stock:", error);

    // Puedes manejar el error aquí, como enviar una notificación al administrador, etc.
    throw error; // Re-lanzar el error para que lo maneje el try-catch de updateOrder
  }
};

//Actualizar el estado de un pedido Admin
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de pedido inválido" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Pedido no encontrado" });
    }

    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .json({ message: "El pedido ya ha sido entregado." });
    }
    const allowedStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Estado de pedido inválido" });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "El pedido ha sido actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el pedido",
    });
  }
};

//Eliminar un pedido Admin
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de pedido inválido" });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "El pedido ha sido eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el pedido",
    });
  }
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
