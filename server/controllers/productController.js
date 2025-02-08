const Product = require("../models/productModel"); // Importar el modelo de productos
const mongoose = require("mongoose"); // Importar mongoose para validar ObjectId

//Crear un nuevo producto
const createProduct = async (req, res) => {
  console.log("req.body en createProduct:", req.body);
  try {
    console.log("req.user:", req.user);
    // Obtener la información del producto, ahora desde req.body como cadenas
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price), // Convertir a número si es necesario
      info: req.body.info,
      category: req.body.category,
      Stock: parseInt(req.body.Stock), // Convertir a número si es necesario
      //images: req.files ? req.files.map((file) => file.path) : [], // Manejar las imágenes subidas por multer
      images: req.files
        ? req.files.map((file) => ({
            product_id: new mongoose.Types.ObjectId().toString(), // Genera un ID único
            url: file.path,
          }))
        : [],
      //otros campos que necesite
    };

    if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no autenticado" });
    }

    productData.user = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productData.user)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de usuario inválido" });
    }

    const newProduct = await Product.create(productData);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// //obtener todos los productos
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     console.error("Error al obtener productos:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error al obtener los productos" });
//   }
// };

const getAllProducts = async (req, res) => {
  try {
    // Extraer parámetros de la URL
    const { keyword, page = 1, price, category, ratings } = req.query;

    // Construir objeto de filtro
    const filter = {};

    // 1. Búsqueda por palabra clave (nombre del producto)
    if (keyword) {
      filter.name = {
        $regex: keyword,
        $options: "i", // Insensible a mayúsculas/minúsculas
      };
    }

    // 2. Filtrar por categoría
    if (category) {
      filter.category = category;
    }

    // 3. Filtrar por rango de precio
    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    // 4. Filtrar por rating mínimo
    if (ratings) {
      filter.ratings = { $gte: Number(ratings) };
    }

    // Configurar paginación
    const resultsPerPage = 8; // Productos por página
    const skip = resultsPerPage * (page - 1); // Productos a saltar

    // Consulta con filtros + paginación
    const products = await Product.find(filter)
      .skip(skip)
      .limit(resultsPerPage)
      .sort({ createdAt: -1 }); // Ordenar por más recientes

    // Obtener el total de productos (para paginación en frontend)
    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      products,
      totalProducts,
      resultsPerPage,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
    });
  }
};

//obtener los detalles de un producto específico
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los detalles del producto",
    });
  }
};
// Actualizar un producto existente
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = req.body;

    // Validar el ID del producto
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de producto inválido" });
    }

    // Encuentra el producto y actualízalo
    let product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    // Verifica si el usuario que realiza la solicitud es el dueño del producto
    if (product.user.toString() !== req.user._id.toString()) {
      //Asegúrate de que el usuario esté autenticado y tenga el campo _id. De lo contrario, req.user._id será undefined.
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar este producto",
      });
    }

    product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar el producto" });
  }
};

//Eliminar un producto existente
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar el ID del producto
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID de producto inválido" });
    }

    // Encuentra el producto y elimínalo
    let product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    // Verifica si el usuario que realiza la solicitud es el dueño del producto
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para eliminar este producto",
      });
    }

    await Product.findByIdAndDelete(id); // Eliminar el producto

    res.status(200).json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar el producto" });
  }
};

//Productos Review
const createProductReview = async (req, res) => {
  try {
    const { productId } = req.params; // Obtener el ID del producto
    let { rating, title, comment, recommend } = req.body; // Obtener la reseña del producto

    rating = Number(rating); // Convierte rating a un número. Si no es un número válido, rating será NaN.

    if (isNaN(rating)) {
      // Verifica si rating es NaN después de la conversión
      return res.status(400).json({
        success: false,
        message: "La calificación (rating) debe ser un número",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    const product = await Product.findById(productId); // Buscar el producto por ID

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    const review = {
      // Crear la reseña del producto
      userId: req.user._id,
      name: req.user.name,
      rating: rating,
      title,
      comment,
      recommend,
      avatar: req.user.avatar ? req.user.avatar.url : undefined, // Asegúrate de que req.user.avatar existe
    };

    // Verificar si el usuario ya ha revisado el producto
    product.reviews.push(review); // Agregar la reseña al producto
    product.numOfReviews = product.reviews.length; // Actualizar el número de reseñas
    //product.ratings =
    //product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //product.reviews.length; // Calcular la calificación promedio

    await product.save(); // Guardar la reseña del producto

    res
      .status(201)
      .json({ success: true, message: "Reseña creada correctamente" });
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al crear la reseña" });
  }
};

// Obtener todas las reseñas de un producto
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

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

    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener las reseñas" });
  }
};

// Eliminar reseña de un producto
const deleteProductReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

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

    const reviewIdString = reviewId.toString(); // Convertir a string una sola vez

    const review = product.reviews.find(
      (rev) => rev._id.toString() === reviewIdString
    );

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Reseña no encontrada" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para eliminar esta reseña",
      });
    }

    product.reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== reviewIdString
    );
    product.numOfReviews = product.reviews.length;

    if (product.reviews.length === 0) {
      product.ratings = 0;
    }

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la reseña:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar la reseña" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
