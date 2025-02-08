//Json web token / Creamos el Token
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//Funcion para crear "token de acceso"
function createAccessToken(user) {
  //Fecha de expiracion del token
  const expToken = new Date(); //Me devuelve la fecha actual en la que estoy
  expToken.setHours(expToken.getHours() + 3); //Le doy 3hs de expiracion

  //Credenciales
  const payload = {
    token_type: "access", //tipo de token,
    user_id: user._id, //ID q viene desde MongoDB
    iat: Date.now(), //Fecha exacta q se crea el token
    exp: expToken.getTime(), //Fecha de expiracion q le dimos al token
    role: user.role, // Agregar el rol del usuario al payload
  };
  //Devolver el Token
  return jwt.sign(payload, JWT_SECRET_KEY);
}

// Función para crear "token de restablecimiento de contraseña"
function createResetPasswordToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 1); // Fecha de expiración del token 1 hora
  const payload = {
    token_type: "reset",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

//Obtener lo que esta detras del "Token"
function decode(token) {
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

//Exportamos las funciones
module.exports = {
  createAccessToken,
  createResetPasswordToken,
  decode,
};
