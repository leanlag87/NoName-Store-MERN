const express = require("express");
const UserController = require("../controllers/userController");
const api = express.Router();
const mdAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");
const mdAdmin = require("../middlewares/adminMiddleware");

api.get(
  "/userController/logout",
  [mdAuth.asureAuth],
  UserController.logoutUser,
); // Ruta para cerrar sesión
api.get("/user/me", [mdAuth.asureAuth], UserController.getMe);
api.post("/password/forgot", UserController.forgotPassword);
api.put("/password/reset/:token", UserController.resetPassword);
api.put("/password/update", [mdAuth.asureAuth], UserController.updatePassword);
api.put(
  "/profile/update",
  [mdAuth.asureAuth, upload.single("avatar")],
  UserController.updateUserProfile,
);
api.get(
  "/admin/get/:id",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.getUserAdmin,
);
api.get(
  "/admin/users",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.getUsers,
);
api.put(
  "/admin/users/:id/role",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.updateUserRole,
);
api.delete(
  "/admin/user/:id",
  mdAuth.asureAuth,
  mdAdmin.isAdmin,
  UserController.deleteUser,
);

module.exports = api;
