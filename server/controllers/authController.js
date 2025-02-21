const User = require("../models/usersModel"); // Importamos el modelo de usuarios
const bcryptjs = require("bcryptjs"); // Importamos bcryptjs para encriptar contraseñas
const jwt = require("../utils/jwt"); // Importamos la función para generar tokens
const validator = require("validator"); // Importamos validator para validar los datos
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY; // Importamos la clave privada del archivo .env

//Logica para registrar ususarios
// async function registerUser(req, res) {
//   const { name, lastname, email, password } = req.body;

//   if (!email) {
//     res.status(400).send({ msg: "Campo obligatorio: Email" });
//     return;
//   }

//   if (!password) {
//     res.status(400).send({ msg: "Campo obligatorio: Contraseña" });
//     return;
//   }

//   //Crear el usuario que vamos a guardar
//   if (
//     !validator.isStrongPassword(password, {
//       minLength: 8,
//       minLowercase: 1,
//       minUppercase: 1,
//       minNumbers: 1,
//       minSymbols: 1,
//     })
//   ) {
//     return res.status(400).send({
//       msg: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
//     });
//   }

//   const user = new User({
//     name: name,
//     lastname: lastname,
//     email: email,
//     password: password,
//     role: "user",
//     active: true,
//   });

//   const salt = bcryptjs.genSaltSync(10); //Generar el salt para encriptar la contraseña
//   const hashPassword = bcryptjs.hashSync(password, salt); //Encriptar la contraseña
//   user.password = hashPassword; //Aqui estaria la contraseña encriptada

//   try {
//     await user.save();
//     // Generar el token JWT
//     //const token = jwt.createAccessToken(user); //Agregado recientemente por sugerencia de google
//     // res
//     //   .status(200)
//     //   .send({ msg: "Usuario guardado correctamente", token: token }); // Incluir el token en la respuesta
//     res.status(200).send({
//       msg: "Usuario guardado correctamente. Por favor, inicie sesión.",
//     });
//   } catch {
//     res.status(500).send({ msg: "No se pudo guardar el usuario" });
//   }
// }

async function registerUser(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    const avatar = req.file; // Para manejar la imagen

    // Validaciones básicas
    if (!email || !password || !name) {
      return res.status(400).send({
        msg: "Campos obligatorios: nombre, email y contraseña",
      });
    }

    // Validar contraseña
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).send({
        msg: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "El email ya está registrado" });
    }

    // Crear usuario
    const user = new User({
      name,
      lastName, // Nota: cambiado de lastname a lastName
      email,
      password,
      role: "user",
      active: true,
      avatar: avatar
        ? {
            public_id: "temp_id",
            url: "temp_url",
          }
        : undefined,
    });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario
    await user.save();

    res.status(200).send({
      success: true,
      msg: "Usuario registrado correctamente. Por favor, inicie sesión.",
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).send({
      success: false,
      msg: "Error al registrar usuario",
      error: error.message,
    });
  }
}

//Logica para loguear usuarios
// async function login(req, res) {
//   const { email, password } = req.body; //Obtener los datos

//   //Logica para validacion
//   if (!email) {
//     res.status(400).send({ msg: "Campo Obligatorio: Email" }); //si el mail no llega le enviaremos un mensaje de error
//     //IMPORTANTE: solo se puede enviar un codigo de respuesta, es decir q el primer mensaje q va a salir es el "primer" error del usuario
//     return; // Termina la ejecución de la función
//   }

//   if (!password) {
//     res.status(400).send({ msg: "Campo Obligatorio: Contraseña" }); //si el pass no llega le enviaremos un mensaje de error
//     return; // Termina la ejecución de la función
//   }

//   //Verificar si existe el usuario
//   try {
//     const user = await User.findOne({ email: email }).select(
//       "+password +active"
//     ); //Verificamos si el usuario existe

//     const check = await bcryptjs.compare(password, user.password); //Verificamos si las contraseñas son iguales / La q tenemos y la q recibimos

//     if (!check) {
//       res.status(400).send({ msg: "Contraseña Incorrecta" });
//     } else if (!user) {
//       res.status(400).send({ msg: "Usuario no autorizado o Inactivo" });
//     } else {
//       //El tipo de token esta creado en utils/jwt.js
//       //res.status(200).send({ access: jwt.createAccessToken(user) }); //Destras del token estan todos los datos del usuario
//       res
//         .status(200)
//         .send({ access: jwt.createAccessToken(user, JWT_PRIVATE_KEY) });
//     }
//   } catch (error) {
//     res.status(500).send({ msg: "Error en el servidor" });
//   }
// }

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email) {
      return res.status(400).send({ msg: "Campo Obligatorio: Email" });
    }

    if (!password) {
      return res.status(400).send({ msg: "Campo Obligatorio: Contraseña" });
    }

    // Buscar usuario
    const user = await User.findOne({ email }).select("+password +active");

    // Verificar si el usuario existe
    if (!user) {
      return res.status(400).send({ msg: "Usuario no encontrado" });
    }

    // Verificar si el usuario está activo
    if (!user.active) {
      return res.status(400).send({ msg: "Usuario inactivo" });
    }

    // Verificar contraseña
    const check = await bcryptjs.compare(password, user.password);
    if (!check) {
      return res.status(400).send({ msg: "Contraseña Incorrecta" });
    }

    // Generar token y enviar respuesta
    const token = jwt.createAccessToken(user, JWT_PRIVATE_KEY);

    // Preparar objeto de usuario sin datos sensibles
    const userToSend = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    res.status(200).send({
      success: true,
      access: token,
      user: userToSend,
      expiresIn: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).send({
      success: false,
      msg: "Error en el servidor",
      error: error.message,
    });
  }
}

//Exportamos las funciones
module.exports = {
  registerUser,
  login,
};
