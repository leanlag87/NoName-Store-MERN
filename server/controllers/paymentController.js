//Importamos la libreria de mercadopago
// SDK de MercadoPago
const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");
const Order = require("../models/orderModel");

// Configuración del cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: {
    timeout: 5000, //Si la API no responde en 5 segundos, se cancela el pago
    idempotencyKey: `ecommerce-${Date.now()}`, // Para evitar pagos duplicados
  },
});

// Inicializar objetos de API
const payment = new Payment(client);
const preference = new Preference(client);

// Controlador para crear preferencia de pago
const createPreference = async (req, res) => {
  try {
    const { orderId } = req.body; // Necesitaremos el ID de la orden

    // Buscar la orden en la base de datos
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("NOTIFICATION_URL:", process.env.NOTIFICATION_URL);

    const preferenceBody = {
      items: order.orderItems.map((item) => ({
        title: item.name,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "ARS",
      })),
      payer: {
        name: order.shippingInfo.firstName,
        email: order.user.email,
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/success`,
        failure: `${process.env.FRONTEND_URL}/failure`,
        pending: `${process.env.FRONTEND_URL}/pending`,
      },
      auto_return: "approved",
      notification_url: process.env.NOTIFICATION_URL,
      external_reference: orderId, // Usamos el ID de la orden existente
    };

    console.log(
      "Creando preferencia con datos:",
      JSON.stringify(preferenceBody, null, 2)
    );
    const result = await preference.create({ body: preferenceBody });
    console.log(
      "Respuesta completa de MercadoPago:",
      JSON.stringify(result, null, 2)
    );

    res.json({
      preferenceId: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error(
      "Error detallado:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ error: "Error al crear preferencia de pago" });
  }
};

// Controlador para recibir webhooks
const webhook = async (req, res) => {
  try {
    const { query } = req;
    console.log("Webhook recibido - Query params:", query);

    const paymentId = query.id || query["data.id"] || req.body.id;
    console.log("ID de pago a verificar:", paymentId);

    if (!paymentId) {
      return res.status(400).json({ error: "No se proporcionó ID de pago" });
    }

    try {
      const paymentInfo = await payment.get({ id: paymentId });
      console.log(
        "Información del pago:",
        JSON.stringify(paymentInfo, null, 2)
      );

      const orderId = paymentInfo.external_reference;
      if (!orderId) {
        throw new Error("No se encontró referencia a la orden");
      }

      // Actualizar el estado de la orden según el estado del pago
      if (paymentInfo.status === "approved") {
        const updateData = {
          orderStatus: "Paid",
          paymentInfo: {
            id: paymentInfo.id,
            status: paymentInfo.status,
            type: paymentInfo.payment_type_id,
            paidAt: new Date(),
          },
        };

        // Usar la función existente de updateOrder
        await Order.findByIdAndUpdate(orderId, updateData, { new: true });
      }

      res.json({ status: "success", payment: paymentInfo });
    } catch (paymentError) {
      console.error("Error al obtener información del pago:", paymentError);
      res.status(404).json({ error: "Pago no encontrado" });
    }
  } catch (error) {
    console.error(
      "Error en webhook:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ error: "Error en webhook" });
  }
};

// Controlador para obtener la API key de MercadoPago
const getMercadoPagoApiKey = async (req, res) => {
  try {
    res.json({
      mercadoPagoApiKey: process.env.MP_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Error al obtener API key:", error);
    res.status(500).json({
      error: "Error al obtener la API key de MercadoPago",
    });
  }
};

module.exports = {
  createPreference,
  webhook,
  getMercadoPagoApiKey,
};
