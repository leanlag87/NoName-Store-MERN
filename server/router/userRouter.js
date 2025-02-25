//importo express
const express = require("express");

//importo el controllador
const UserController = require("../controllers/userController");

//creo el router
const api = express.Router();

//importo el middleware
const mdAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");
const mdAdmin = require("../middlewares/adminMiddleware");

//Rutas
api.get(
  "/userController/logout",
  [mdAuth.asureAuth],
  UserController.logoutUser
); // Ruta para cerrar sesión
api.get("/user/me", [mdAuth.asureAuth], UserController.getMe);
api.post("/password/forgot", UserController.forgotPassword); //Cambiar contraseña
api.put("/password/reset/:token", UserController.resetPassword); //Resetear contraseña
api.put("/password/update", [mdAuth.asureAuth], UserController.updatePassword); //Modificar contraseña
api.put(
  "/profile/update",
  [mdAuth.asureAuth, upload.single("avatar")],
  UserController.updateUserProfile
); //Modificar perfil
api.get(
  "/admin/get/:id",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.getUserAdmin
); // Ruta para obtener un usuario (solo administrador)
api.get(
  "/admin/users",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.getUsers
); //Obtenemos todos los usuarios
api.put(
  "/admin/users/:id/role",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.updateUserRole
); // Actualizar el rol de un usuario (solo administrador)
api.delete(
  "/admin/user/:id",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.deleteUser
); //Eliminar usuarios (solo administrador)

//exporto el enrutador para usarlo en app.js
module.exports = api;
