const express = require("express"); //Importamos express
const bodyParser = require("body-parser"); //Importamos bodyparser
const cors = require("cors"); //Importamos los cors
const path = require("path"); //Importamos path
const session = require("express-session"); //Importamos express-session

//Creamos nuestra app con express
const app = express();

// Middleware para procesar datos de formulario
app.use(express.urlencoded({ extended: true }));

// Configurar session ANTES de CORS
app.use(
  session({
    secret: "ESTO ES SECRETO",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Configurar CORS después de session
app.use(
  cors({
    origin: "http://localhost:3000", // URL del frontend
    credentials: true, // Importante para las cookies/sesiones
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Configurar Body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurar static folder
//app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Importar rutas
const authRoutes = require("./router/authRouter");
const userRoutes = require("./router/userRouter");
const productRoutes = require("./router/productRouter");
const orderRoutes = require("./router/orderRouter");
const paymentRoutes = require("./router/paymentRouter");
const cartRoutes = require("./router/cartRouter");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

//Configurar Rutas
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", paymentRoutes);
app.use("/api/v1/", cartRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
