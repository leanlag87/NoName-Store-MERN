// Middleware para manejar errores 404 (Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware para manejar otros errores
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };

/*
  
  Explicación del código:
1. Función notFound:
Este middleware se ejecuta cuando ninguna ruta coincide con la solicitud del usuario.
Crea un nuevo objeto Error con un mensaje indicando que la URL no se encontró.
Establece el código de estado de la respuesta en 404 (Not Found).
Llama a next(error) para pasar el error al siguiente middleware (en este caso, errorHandler).

2. Función errorHandler:
Este middleware es el último en la cadena de middlewares y se encarga de manejar cualquier error que haya ocurrido.
Determina el código de estado a utilizar. Si el código de estado actual es 200 (OK), lo cambia a 500 (Internal Server Error).
Envía una respuesta JSON con el mensaje de error y la pila de errores (solo en modo de desarrollo).

3. Exportación de Middlewares:
Se exportan las funciones notFound y errorHandler para que puedan ser utilizadas en la aplicación.

  
  */
