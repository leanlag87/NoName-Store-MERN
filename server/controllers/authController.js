const User = require("../models/usersModel"); // Importamos el modelo de usuarios
const bcryptjs = require("bcryptjs"); // Importamos bcryptjs para encriptar contraseñas
const jwt = require("../utils/jwt"); // Importamos la función para generar tokens

//Logica para registrar ususarios
async function registerUser(req, res) {
  const { name, lastname, email, password } = req.body;

  if (!email) {
    res.status(400).send({ msg: "Campo obligatorio: Email" });
    return;
  }

  if (!password) {
    res.status(400).send({ msg: "Campo obligatorio: Contraseña" });
    return;
  }

  //Crear el usuario que vamos a guardar
  const user = new User({
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    role: "user",
    active: true,
  });

  const salt = bcryptjs.genSaltSync(10); //Generar el salt para encriptar la contraseña
  const hashPassword = bcryptjs.hashSync(password, salt); //Encriptar la contraseña
  user.password = hashPassword; //Aqui estaria la contraseña encriptada

  try {
    await user.save();
    // Generar el token JWT
    const token = jwt.createAccessToken(user); //Agregado recientemente por sugerencia de google
    res
      .status(200)
      .send({ msg: "Usuario guardado correctamente", token: token }); // Incluir el token en la respuesta
  } catch {
    res.status(500).send({ msg: "No se pudo guardar el usuario" });
  }
}

//Logica para loguear usuarios
async function login(req, res) {
  const { email, password } = req.body; //Obtener los datos

  //Logica para validacion
  if (!email) {
    res.status(400).send({ msg: "Campo Obligatorio: Email" }); //si el mail no llega le enviaremos un mensaje de error
    //IMPORTANTE: solo se puede enviar un codigo de respuesta, es decir q el primer mensaje q va a salir es el "primer" error del usuario
    return; // Termina la ejecución de la función
  }

  if (!password) {
    res.status(400).send({ msg: "Campo Obligatorio: Contraseña" }); //si el pass no llega le enviaremos un mensaje de error
    return; // Termina la ejecución de la función
  }

  //Verificar si existe el usuario
  try {
    const user = await User.findOne({ email: email }).select(
      "+password +active"
    ); //Verificamos si el usuario existe

    const check = await bcryptjs.compare(password, user.password); //Verificamos si las contraseñas son iguales / La q tenemos y la q recibimos

    if (!check) {
      res.status(400).send({ msg: "Contraseña Incorrecta" });
    } else if (!user) {
      res.status(400).send({ msg: "Usuario no autorizado o Inactivo" });
    } else {
      //El tipo de token esta creado en utils/jwt.js
      res.status(200).send({ access: jwt.createAccessToken(user) }); //Destras del token estan todos los datos del usuario
    }
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

//Exportamos las funciones
module.exports = {
  registerUser,
  login,
};
