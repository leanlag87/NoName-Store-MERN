//Ruta para los pagos
// const mercadopago = require("mercadopago");
// console.log("MercadoPago SDK:", mercadopago);
//mercadopago.accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
// mercadopago.accessToken =
//   "APP_USR-7586325678669166-111915-6e531af7f5a60cf50bd317c7e4099166-2108526680";

// async function testPreferences() {
//   try {
//     // Obtenemos la clase Preference
//     const Preference = mercadopago.Preference;

//     const preference = {
//       items: [
//         {
//           title: "Test Item",
//           unit_price: 100,
//           quantity: 1,
//         },
//       ],
//     };

//     // Llamamos a Preference.create en lugar de mercadopago.preferences.create
//     const response = await Preference.create(preference);
//     console.log("Preference creada correctamente:", response);
//   } catch (error) {
//     console.error("Error al probar Preference.create:", error);
//   }
// }

// testPreferences();

// const createPayment = async (req, res) => {
//   const { items, shippingInfo, externalReference } = req.body; // Recibe los datos del pedido

//   try {
//     // Valida los datos de entrada
//     if (!items || !items.length || !shippingInfo?.email) {
//       return res.status(400).json({
//         success: false,
//         message: "Datos inválidos. Por favor revisa el cuerpo de la solicitud.",
//       });
//     }

//     // Objeto de preferencia
//     const preference = {
//       items,
//       back_urls: {
//         success: "https://github.com/leanlag87",
//         failure: "https://github.com/leanlag87",
//         pending: "https://github.com/leanlag87",
//       },
//       auto_return: "approved",
//       payer: {
//         email: shippingInfo.email,
//         name: shippingInfo.name || "Sin Nombre",
//         surname: shippingInfo.surname || "Sin Apellido",
//         phone: {
//           area_code: shippingInfo.areaCode || "",
//           number: shippingInfo.phoneNo || "",
//         },
//         address: {
//           street_name: shippingInfo.address || "Sin Dirección",
//           zip_code: shippingInfo.pinCode || "",
//         },
//       },
//       payment_methods: {
//         excluded_payment_methods: [
//           { id: "ticket" },
//           { id: "atm" },
//           { id: "bank_transfer" },
//           { id: "digital_currency" },
//         ],
//       },
//       external_reference: externalReference || "pedido_generico", // Usar un ID dinámico
//       notification_url: `${process.env.WEBHOOK_URL}/api/v1/webhook`, // URL dinámica para Webhook
//     };

//     const response = await mercadopago.preferences.create(preference);
//     //console.log("Preference creada correctamente:", response);

//     res.status(200).json({
//       success: true,
//       init_point: response.body.init_point, // Cambia sandbox_init_point por init_point en producción
//       preferenceId: response.body.id,
//     });
//   } catch (error) {
//     console.error("Error al crear la preferencia de pago:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error al crear la preferencia de pago",
//     });
//   }
// };

// const createPayment = async (req, res) => {
//   try {
//     const { items, shippingInfo, externalReference } = req.body;

//     if (!items || !items.length || !shippingInfo?.email) {
//       return res.status(400).json({
//         success: false,
//         message: "Datos inválidos. Por favor revisa el cuerpo de la solicitud.",
//       });
//     }

//     const preference = {
//       items,
//       back_urls: {
//         success: "https://github.com/leanlag87",
//         failure: "https://github.com/leanlag87",
//         pending: "https://github.com/leanlag87",
//       },
//       auto_return: "approved",
//       payer: {
//         email: shippingInfo.email,
//         name: shippingInfo.name || "Sin Nombre",
//         surname: shippingInfo.surname || "Sin Apellido",
//         phone: {
//           area_code: shippingInfo.areaCode || "",
//           number: shippingInfo.phoneNo || "",
//         },
//         address: {
//           street_name: shippingInfo.address || "Sin Dirección",
//           zip_code: shippingInfo.pinCode || "",
//         },
//       },
//       external_reference: externalReference || "pedido_generico",
//       notification_url:
//         "https://f631-181-94-187-16.ngrok-free.app/api/v1/webhook",
//     };

//     // Cambiar a mercadopago.Preference.create
//     const response = await mercadopago.Preference.create(preference);

//     res.status(200).json({
//       success: true,
//       init_point: response.body.init_point,
//       preferenceId: response.body.id,
//     });
//   } catch (error) {
//     console.error("Error al crear la preferencia de pago:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error al crear la preferencia de pago",
//     });
//   }
// };

// const mercadopagoWebhook = async (req, res) => {
//   try {
//     const { type, "data.id": dataId } = req.query;

//     // Verifica que el webhook contenga los datos necesarios
//     if (!type || !dataId) {
//       return res.status(400).json({
//         success: false,
//         message: "Datos inválidos en el Webhook.",
//       });
//     }

//     console.log("Datos recibidos en el Webhook:", req.query);

//     if (type === "payment") {
//       // Busca los datos del pago
//       const payment = await mercadopago.payment.findById(dataId);
//       console.log("Información del pago:", payment.body);

//       // Aquí puedes agregar lógica adicional como actualizar la base de datos
//     }

//     res.sendStatus(200); // Asegura que MercadoPago no reintente la notificación
//   } catch (error) {
//     console.error("Error en el Webhook de MercadoPago:", error);
//     res.status(500).send({ message: "Error en el Webhook de MercadoPago." });
//   }
// };

// const createPayment = async (req, res) => {
//   const { items, totalPrice, shippingInfo } = req.body; // Recibe los datos del pedido

//   try {
//     //console.log("Preference Object:", preference);

//     // Crea un objeto de preferencia
//     let preference = {
//       items,
//       totalPrice,
//       back_urls: {
//         success: "https://github.com/leanlag87", // URL de éxito en tu frontend
//         failure: "https://github.com/leanlag87", // URL de fallo en tu frontend
//         pending: "https://github.com/leanlag87", // URL de pendiente en tu frontend
//       },
//       auto_return: "approved", // Redirige automáticamente al usuario después del pago
//       payer: {
//         email: shippingInfo.email, // Asegúrate de tener el email en shippingInfo
//         name: shippingInfo.address,
//         surname: shippingInfo.city,
//         phone: {
//           area_code: "",
//           number: shippingInfo.phoneNo,
//         },
//         address: {
//           street_name: shippingInfo.address,
//           zip_code: shippingInfo.pinCode,
//         },
//       },

//       payment_methods: {
//         excluded_payment_methods: [
//           { id: "ticket" },
//           { id: "atm" },
//           { id: "bank_transfer" },
//           { id: "digital_currency" },
//         ],
//       },

//       external_reference: "referencia_del_pedido", // Agrega una referencia a tu pedido
//       notification_url:
//         "https://f631-181-94-187-16.ngrok-free.app/api/v1/webhook", // URL de webhook para notificaciones (opcional, pero recomendado)
//     };
//     const response = await mercadopago.preferences.create(preference);
//     console.log(response);

//     res.status(200).send({
//       success: true,
//       init_point: response.body.sandbox_init_point,
//       preferenceId: response.body.id,
//     }); // Envía la URL de pago al frontend
//   } catch (error) {
//     console.error("Error al crear la preferencia de pago:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error al crear la preferencia de pago",
//     });
//   }
// };

// const mercadopagoWebhook = async (req, res) => {
//   try {
//     const payment = req.query;
//     console.log(req.query);

//     if (payment.type === "payment") {
//       const data = await mercadopago.payment.findById(payment["data.id"]);
//       console.log(data);
//     }

//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error en el webhook de MercadoPago:", error);
//     res.status(500).send({ msg: "Error con MercadoPago Webhook" });
//   }
// };
