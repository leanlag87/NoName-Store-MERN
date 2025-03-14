//Middleware
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  let token;

  // Verificar si el token viene en los headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extraer el token

      //const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verificar el token con la clave secreta
      const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
        algorithms: ["RS256"],
      }); // Verificar el token con la clave publica

      if (!decoded || !decoded.user_id) {
        return res.status(401).json({
          message: "Token inválido o usuario no encontrado en el token",
        });
      }

      req.user = await User.findById(decoded.user_id);

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Usuario no encontrado en la base de datos" });
      }

      next();
    } catch (error) {
      console.error("Error en authUser:", error);
      res.status(401).json({ message: "Token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

module.exports = { authUser };
