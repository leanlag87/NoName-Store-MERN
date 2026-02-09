# 🛒 NoName-Store-MERN

**Tienda en línea (e-commerce)** desarrollada con arquitectura MVC y el **Stack MERN** (MongoDB, Express.js, React, Node.js). Esta aplicación web full-stack permite la gestión y venta de productos en línea con un panel de administración completo.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- ✅ **Arquitectura MVC** bien estructurada
- ✅ **Autenticación JWT** segura
- ✅ **Middleware de autorización** (admin, user)
- ✅ **Subida y gestión de imágenes**
- ✅ **Integración de pagos** con Mercado Pago
- ✅ **Sistema de sesiones** y cookies
- ✅ **Manejo de errores** centralizado
- ✅ **Validación de datos** con Validator
- ✅ **CORS** configurado para desarrollo
- ✅ **Interfaz responsive** con Material-UI
- ✅ **Dashboard con estadísticas** usando Highcharts

## 🚀 Tecnologías Utilizadas

### Frontend (Client)

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Redux Toolkit** - Gestión de estado global
- **Material-UI (MUI)** - Componentes de interfaz de usuario
- **React Router** - Navegación del lado del cliente
- **Axios** - Cliente HTTP para peticiones
- **Swiper** - Carruseles y sliders modernos
- **React Toastify** - Notificaciones elegantes
- **Highcharts** - Gráficos y estadísticas
- **Styled Components** - CSS-in-JS

### Backend (Server)

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Encriptación de contraseñas
- **Multer** - Subida de archivos
- **Nodemailer** - Envío de correos electrónicos
- **Mercado Pago SDK** - Procesamiento de pagos
- **Validator** - Validación de datos

## 🎯 Funcionalidades

### Para Clientes 👥

- **Catálogo de productos** con slider principal y productos destacados
- **Carrito de compras** funcional con persistencia
- **Sistema de autenticación** (registro, login, logout)
- **Gestión de pedidos** y historial de compras
- **Integración con Mercado Pago** para pagos seguros
- **Sistema de calificaciones** para productos
- **Búsqueda y filtrado** de productos por categorías
- **Perfil de usuario** editable

### Para Administradores 👨‍💼

- **Panel de administración** completo
- **Gestión de productos** (crear, actualizar, eliminar)
- **Gestión de usuarios** y permisos
- **Gestión de pedidos** y estados
- **Dashboard con estadísticas** y métricas
- **Subida de imágenes** para productos
- **Sistema de revisiones** de productos
- **Reportes de ventas** y análisis

## 🛠️ Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- NPM o Yarn

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/NoName-Store-MERN.git
cd NoName-Store-MERN
```

2. **Instalar dependencias del servidor**

```bash
cd server
npm install
```

3. **Instalar dependencias del cliente**

```bash
cd ../client
npm install
```

## ⚙️ Configuración

### Variables de entorno del servidor

Crear un archivo `.env` en la carpeta `server` con las siguientes variables:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/noname-store

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro
JWT_EXPIRE=7d

# Session
SESSION_SECRET=tu_session_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=tu_access_token_de_mercado_pago

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

# Entorno
NODE_ENV=development
```

### Configuración del cliente

Revisar el archivo `client/src/config.js` para ajustar las URLs de la API:

```javascript
const config = {
  API_URL: "http://localhost:5000/api",
  // otras configuraciones...
};
```

## 🚀 Uso

### Desarrollo

1. **Iniciar el servidor** (Puerto 5000)

```bash
cd server
npm run dev
```

2. **Iniciar el cliente** (Puerto 3000)

```bash
cd client
npm start
```

3. **Acceder a la aplicación**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Producción

1. **Construir el cliente**

```bash
cd client
npm run build
```

2. **Iniciar el servidor en producción**

```bash
cd server
npm start
```

## 📁 Estructura del Proyecto

```
NoName-Store-MERN/
├── client/                 # Frontend React
│   ├── public/            # Archivos públicos
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── routes/        # Configuración de rutas
│   │   ├── store/         # Redux store y reducers
│   │   ├── utils/         # Utilidades y helpers
│   │   └── assets/        # Imágenes y recursos
│   └── package.json
├── server/                # Backend Node.js
│   ├── controllers/       # Lógica de negocio
│   ├── models/           # Modelos de MongoDB
│   ├── routes/           # Rutas de la API
│   ├── middlewares/      # Middlewares personalizados
│   ├── utils/            # Utilidades del servidor
│   ├── uploads/          # Archivos subidos
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cierre de sesión

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Usuarios

- `GET /api/users/profile` - Obtener perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil
- `GET /api/admin/users` - Obtener todos los usuarios (Admin)

### Pedidos

- `POST /api/orders` - Crear nuevo pedido
- `GET /api/orders/me` - Obtener pedidos del usuario
- `GET /api/admin/orders` - Obtener todos los pedidos (Admin)

### Carrito

- `GET /api/cart` - Obtener carrito del usuario
- `POST /api/cart/add` - Agregar producto al carrito
- `PUT /api/cart/update` - Actualizar cantidad en carrito
- `DELETE /api/cart/remove` - Eliminar producto del carrito

### Pagos

- `POST /api/payment/create-preference` - Crear preferencia de pago con Mercado Pago
- `POST /api/payment/webhook` - Webhook de Mercado Pago

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Leandro González**

---

## 📞 Soporte

Si tenes alguna pregunta o problema, no dudes en abrir un issue en el repositorio.

## 🔄 Versión

**v1.0.0** - Versión inicial estable

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
