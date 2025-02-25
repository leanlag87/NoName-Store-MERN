// Importar modelo de carrito y producto
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

// Agregar producto al carrito
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de producto inválido" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    //let cart = await Cart.findOne({ user: userId });

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "cartItems.product",
      select: "name price images Stock",
    });

    if (!cart) {
      //Crear carrito si no existe.
      cart = await Cart.create({
        user: userId,
        cartItems: [],
      });
    }

    //Verificar si el producto ya existe en el carrito.
    const isProductInCart = cart.cartItems.some(
      (item) => item.product.toString() === productId.toString()
    );

    if (isProductInCart) {
      //Si existe, actualizar la cantidad.

      cart.cartItems = cart.cartItems.map((item) =>
        item.product.toString() === productId.toString()
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Agregar el nuevo producto al carrito.
      cart.cartItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images.map((img) => img.url),
        quantity: quantity,
      });
    }

    await cart.save(); //Guarda el carrito.
    res.status(200).json({
      //Respuesta de éxito
      success: true,
      message: "Producto agregado al carrito correctamente",
      cart, //Se incluye el carrito.
    });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({
      success: false,
      message: "Error al agregar el producto al carrito",
    });
  }
};

// Obtener el carrito del usuario actual
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      //Populate para obtener los datos del producto.

      path: "cartItems.product",
      select: "name price images Stock",
    });

    if (!cart) {
      // Si el carrito no existe, devolver un carrito vacío
      return res.status(200).json({ success: true, cart: { cartItems: [] } });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener el carrito" });
  }
};

// Eliminar producto del carrito
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de producto inválido" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Carrito no encontrado o vacio" });
    }

    // Eliminar el producto del carrito
    const updatedCartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    //Si no hay mas productos en el carrito eliminamos el carrito
    if (updatedCartItems.length === 0) {
      await Cart.findOneAndDelete({ user: userId });
      return res.status(200).json({
        success: true,
        message: "Carrito vacio, eliminando carrito...",
      });
    } else {
      cart.cartItems = updatedCartItems;
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Producto eliminado del carrito",
        cart,
      });
    }
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el producto del carrito",
    });
  }
};

// actualizar el carrito
const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Carrito no encontrado" });
    }

    cart.cartItems = cartItems;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Carrito actualizado correctamente",
      cart,
    });
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar el carrito" });
  }
};

//vaciar el carrito
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({
      success: true,
      message: "Carrito vaciado correctamente",
    });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al vaciar el carrito" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
  clearCart,
};
