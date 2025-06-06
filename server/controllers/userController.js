//Importamos el "modelo"
const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const jwt = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail"); // Importar la función sendEmail para enviar correos electrónicos
const RevokedToken = require("../models/revokedTokenModel"); // Importamos el modelo de tokens revocados

//Funcion para cerrar sesion
async function logoutUser(req, res) {
  try {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization.replace("Bearer ", "");

    // Verificar si el token ya está en la lista de tokens revocados
    const revokedTokenExists = await RevokedToken.findOne({ token });
    if (revokedTokenExists) {
      return res.status(400).send({ msg: "El token ya ha sido revocado" });
    }

    // Agregar el token a la lista de tokens revocados
    const revokedToken = new RevokedToken({ token });
    await revokedToken.save();

    res.status(200).send({ msg: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).send({ msg: "Error al cerrar sesión" });
  }
}

//Funcion para obtener los datos del usurario "getMe"
async function getMe(req, res) {
  //obtenemos el payload del middleware
  const { user_id } = req.user; //obtenemos el "ID" del usuario

  try {
    const user = await User.findById(user_id).select("-password -__v -active"); //obtenemos un solo usuario con el metodo "findById"
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ msg: "Usuario No Encontrado" });
  }
}

//solicitar restablecimiento de contraseña por email
async function forgotPassword(req, res) {
  const { email } = req.body; //Obtener el correo: Obtiene el correo del cuerpo de la solicitud.

  if (!email) {
    //Validar el correo: Verifica que el correo no esté vacío.
    res.status(400).send({ msg: "Campo obligatorio: Email" });
    return;
  }

  try {
    //Busca al usuario en la base de datos utilizando el correo proporcionado.
    const user = await User.findOne({ email: email });

    if (!user) {
      //Verificar si el usuario existe: Si el usuario no existe, envía una respuesta con un código de estado 404 (Not Found).
      res.status(404).send({ msg: "Usuario no encontrado" });
      return;
    }

    // Generar el token de restablecimiento de contraseña Llama al método getResetPasswordToken del modelo de usuario para generar el token.
    const resetToken = user.getResetPasswordToken();

    // Guardar el usuario con el token de restablecimiento de contraseña y la fecha de expiración en la base de datos.
    await user.save();

    // Construir la URL de restablecimiento de contraseña que se enviará al usuario por correo electrónico.
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/authController/resetPassword/${resetToken}`;

    //Enviar el correo electrónico (opcional): Si has configurado la función sendEmail, puedes descomentar el bloque de código para enviar el correo electrónico al usuario.
    /*
try {
  await sendEmail({
    email: user.email,
    subject: "Restablecimiento de contraseña",
    message: `Hola ${user.name},\n\nHas solicitado restablecer tu contraseña.\n\nPor favor, haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${resetUrl}\n\nSi no has solicitado restablecer tu contraseña, puedes ignorar este correo electrónico.\n\nAtentamente,\nEl equipo de NoName-Store`,
  });

  res.status(200).send({ msg: "Correo electrónico enviado correctamente" });
} catch (error) {
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(500).send({ msg: "Error al enviar el correo electrónico" });
}
*/

    // Mostrar la URL de restablecimiento en la consola (temporal)
    console.log(`URL de restablecimiento de contraseña: ${resetUrl}`);
    res
      .status(200)
      .send({ msg: "URL de restablecimiento de contraseña:", resetUrl });
  } catch (error) {
    res.status(500).send({ msg: "Error al procesar la solicitud" });
  }
}

//resetear y modificar la contraseña
async function resetPassword(req, res) {
  const { token } = req.params; // Obtener el token de la URL
  const { password, confirmPassword } = req.body;

  if (!token) {
    res
      .status(400)
      .send({ msg: "Token de restablecimiento de contraseña requerido" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).send({ msg: "Las contraseñas no coinciden" });
    return;
  }

  try {
    // Buscar al usuario utilizando el token de restablecimiento
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).send({ msg: "Token inválido o expirado" });
      return;
    }

    // Actualizar la contraseña
    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)); // Encriptar la nueva contraseña

    // Eliminar el token de restablecimiento de contraseña
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Guardar los cambios en la base de datos
    await user.save();

    // Enviar un nuevo token JWT
    const newToken = jwt.createAccessToken(user); // Generar un nuevo token JWT
    res
      .status(200)
      .send({ msg: "Contraseña restablecida correctamente", token: newToken });
  } catch (error) {
    res.status(500).send({ msg: "Error al restablecer la contraseña" });
  }
}

//Actualizar la contraseña del usuario, usuario autenticado
async function updatePassword(req, res) {
  const { user_id } = req.user;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const user = await User.findById(user_id).select("+password");
    if (!user) {
      res.status(404).send({ msg: "Usuario no encontrado" });
      return;
    }
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(400).send({ msg: "La contraseña actual es incorrecta" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      res.status(400).send({ msg: "Las nuevas contraseñas no coinciden" });
      return;
    }
    user.password = bcryptjs.hashSync(newPassword, bcryptjs.genSaltSync(10));
    await user.save();
    res.status(200).send({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error al actualizar la contraseña del usuario" });
  }
}

// Actualizar el perfil del usuario
async function updateUserProfile(req, res) {
  const { user_id } = req.user; // Obtener el ID del usuario autenticado
  const { name, email } = req.body; // Obtener los campos del perfil del usuario
  try {
    // Obtener el usuario actual
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    // Actualizar los campos del perfil
    user.name = name || user.name;
    user.email = email || user.email;

    // Guardar la ruta de la imagen en el campo "avatar" si se subió una imagen
    if (req.file) {
      user.avatar = {
        public_id: req.file.filename, // Guardar el nombre del archivo como `public_id`
        url: req.file.path, // La URL o ruta del archivo subido
      };
    }

    // Guardar los cambios en la base de datos
    await user.save();

    res
      .status(200)
      .send({ msg: "Perfil de usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).send({ msg: "Error al actualizar el perfil de usuario" });
  }
}

// === Funciones para el Administrador ===

// Funcion para Obtener un solo usuario (acceso solo para administrador)
async function getUserAdmin(req, res) {
  const { id } = req.params; // Obtiene el ID del usuario desde los parámetros de la URL
  try {
    const user = await User.findById(id).select("-password"); // Busca al usuario en la base de datos

    // Si el usuario no es encontrado
    if (!user) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }
    res.status(200).send(user); // Retorna los detalles del usuario encontrado
  } catch (error) {
    res.status(500).send({ msg: "Error al obtener el usuario" });
  }
}

//Obtener todos los usuarios
async function getUsers(req, res) {
  try {
    const users = await User.find(); //Con el metodo "find" obtenemos todos los usuarios
    res.status(200).send(users); //Si todo esta bien le enviamos los "Usuarios" al cliente/front
  } catch (error) {
    res.status(500).send({ msg: "Error al obtener los Usuarios" }); //En caso contrario le enviamos el msg de error
  }
}

// Actualizar el rol de un usuario (solo administrador)
async function updateUserRole(req, res) {
  const { id } = req.params; // Obtener el ID del usuario a actualizar
  const { oldRole, newRole } = req.body; // Obtener el nuevo rol del usuario

  // Validar que se proporcione un rol
  if (!oldRole || !newRole) {
    return res
      .status(400)
      .send({ msg: "Se requiere ambos roles: actual y nuevo" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    // Verificar si el rol actual coincide con el rol del usuario
    if (user.role !== oldRole) {
      return res
        .status(400)
        .send({ msg: "El rol actual del usuario no coincide" });
    }

    user.role = newRole; // Actualizar el rol del usuario
    await user.save(); // Guardar los cambios en la base de datos
    res.status(200).send({ msg: "Rol de usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).send({ msg: "Error al actualizar el rol de usuario" });
  }
}

// Eliminar usuarios (solo administrador)
async function deleteUser(req, res) {
  const { id } = req.params; //obtener el ID del usuario a eliminar

  try {
    //Eliminar usuario de la base de datos
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    res.status(200).send({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ msg: "Error al eliminar el usuario" });
  }
}

//Exportamos la funcion
module.exports = {
  logoutUser,
  getMe,
  getUsers,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUserProfile,
  getUserAdmin,
  updateUserRole,
  deleteUser,
};
