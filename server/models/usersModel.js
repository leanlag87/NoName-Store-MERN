//1. Importo mongoose
const mongoose = require("mongoose");
const validator = require("validator"); // Importa la librería validator
const jwt = require("../utils/jwt");

//2. Creo el "Esquema"
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ingrese su nombre por favor"],
    minLength: [4, "El nombre debe tener mas de 4 caracteres"],
  },
  lastname: {
    type: String,
    required: [true, "Ingrese su nombre por favor"],
    minLength: [4, "El apellido debe tener mas de 4 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Ingrese su correo por favor"],
    unique: true,
    //comprueba la cadena de correo electrónico dada y después de verificar si el tipo de correo electrónico es correcto o no es verdadero
    validate: [
      validator.isEmail,
      "Por favor ingrese un correo electrónico válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Ingrese su contraseña por favor"],
    minLength: [10, "La contraseña debe tener más de 4 caracteres."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: false, // Cambiar a false si no es obligatorio
    },
    url: {
      type: String,
      required: false, // Cambiar a false si no es obligatorio
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//definición del esquema
UserSchema.methods.getResetPasswordToken = function () {
  // Generar el token de restablecimiento de contraseña
  const resetToken = jwt.createResetPasswordToken(this); // "this" se refiere al usuario actual

  // Asignar el token al usuario
  this.resetPasswordToken = resetToken;

  // Establecer la fecha de expiración del token
  this.resetPasswordExpire = Date.now() + 1 * 60 * 60 * 1000; // 1 hora en milisegundos

  return resetToken;
};

//3. Exporto el modelo
module.exports = mongoose.model("User", UserSchema);

/*
Se importó la función createResetPasswordToken desde jwt.js.
Se definió el método getResetPasswordToken en el modelo de usuario.
Este método genera un token de restablecimiento de contraseña utilizando createResetPasswordToken y lo asigna al campo resetPasswordToken del usuario.
También establece la fecha de expiración del token en 1 hora.
Finalmente, devuelve el token generado.
 */
