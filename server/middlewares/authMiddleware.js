//Importamos "JWT"
const jwt = require("../utils/jwt");

//El objetivo de los Middlewares el verificar que todo este bien , lo podemos usar para bloquear las rutas
function asureAuth(req, res, next) {
  //Verificamos que llegue "token"
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: "La Peticion no tiene la Cabecera" });
  }

  //Reemplazamos la palabra "Bearer" por un string vacio para solo obtener/mostrar el "Token"
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decode(token); //Cuando llegue el token, recibimos el "payload"
    const { exp } = payload; //Sacamos la fecha de expiracion
    const currentData = new Date().getTime(); //Sacamos la fecha actual

    //Verificamos si el token expiro
    if (exp <= currentData) {
      return res.status(400).send({ msg: "El Token Expiro" });
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
