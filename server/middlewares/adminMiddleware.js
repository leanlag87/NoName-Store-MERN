// Middleware para verificar si es administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // El usuario es administrador, continúa con la siguiente función
  } else {
    res.status(403).send({ msg: "No tienes permiso para acceder a esta ruta" }); // El usuario no es administrador, devuelve un error 403
  }
};

module.exports = { isAdmin };
