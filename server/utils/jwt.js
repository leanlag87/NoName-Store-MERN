//Json web token / Creamos el Token
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Funcion para crear "token de acceso"
function createAccessToken(user, privateKey) {
  //Fecha de expiracion del token
  const expToken = new Date(); //Me devuelve la fecha actual en la que estoy
  expToken.setHours(expToken.getHours() + 3); //Le doy 3hs de expiracion

  //Credenciales
  const payload = {
    token_type: "access", //tipo de token,
    user_id: user._id, //ID q viene desde MongoDB
    iat: Math.floor(Date.now() / 1000), //Fecha exacta q se crea el token
    exp: expToken.getTime() / 1000, //Fecha de expiracion q le dimos al token
    role: user.role, // Agregar el rol del usuario al payload
  };
  //Devolver el Token
  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
}

// Función para crear "token de restablecimiento de contraseña"
function createResetPasswordToken(user, privateKey) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 1); // Fecha de expiración del token 1 hora
  const payload = {
    token_type: "reset",
    user_id: user._id,
    iat: Math.floor(Date.now() / 1000),
    exp: expToken.getTime() / 1000,
  };
  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
}

///Obtener lo que esta detras del "Token" sin verificar
function decode(token) {
  return jwt.decode(token);
}

//Verificar y decodificar el token
function verify(token, publicKey) {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
}

//Exportamos las funciones
module.exports = {
  createAccessToken,
  createResetPasswordToken,
  decode,
  verify,
};
