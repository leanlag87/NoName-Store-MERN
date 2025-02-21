//Importamos "JWT"
const jwt = require("../utils/jwt");
const RevokedToken = require("../models/revokedTokenModel");

//Importamos la clave publica
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

//El objetivo de los Middlewares el verificar que todo este bien , lo podemos usar para bloquear las rutas
async function asureAuth(req, res, next) {
  //Verificamos que llegue "token"
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: "La Peticion no tiene la Cabecera" });
  }

  //Reemplazamos la palabra "Bearer" por un string vacio para solo obtener/mostrar el "Token"
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    // Verificar si el token está en la lista de tokens revocados
    const revokedToken = await RevokedToken.findOne({ token });
    if (revokedToken) {
      return res.status(401).send({ msg: "Token revocado" });
    }

    //const payload = jwt.decode(token); //Cuando llegue el token, recibimos el "payload"
    //const payload = jwt.decode(token, JWT_PUBLIC_KEY); //Cuando llegue el token, recibimos el "payload"
    const payload = jwt.verify(token, JWT_PUBLIC_KEY);
    const { exp } = payload; //Sacamos la fecha de expiracion
    //const currentData = new Date().getTime(); //Sacamos la fecha actual
    // Convertir current time a segundos para comparar con exp
    const currentData = Math.floor(Date.now() / 1000);

    //Verificamos si el token expiro
    if (exp <= currentData) {
      return res.status(400).send({ msg: "El Token Expiro" });
    }

    if (payload.token_type !== "access") {
      return res.status(400).send({ msg: "Token inválido: Tipo incorrecto" });
    }

    console.log("Payload:", payload);
    //Enviamos al controlador el "payload"
    req.user = payload;
    //Pasa al controllador
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token Invalido" });
  }
}

//Exportamos la funcion
module.exports = {
  asureAuth,
};
