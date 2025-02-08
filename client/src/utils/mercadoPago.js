import axios from "../config"; // Usar la instancia configurada
import { initMercadoPago } from "@mercadopago/sdk-react";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const initializeMercadoPago = async () => {
  try {
    // Si tienes la key en el frontend, puedes usarla directamente
    const publicKey = process.env.REACT_APP_MP_PUBLIC_KEY;
    if (publicKey) {
      initMercadoPago(publicKey);
    } else {
      // O obtenerla del backend si prefieres
      const { data } = await axios.get(API_ENDPOINTS.PAYMENT.API_KEY);
      initMercadoPago(data.mercadoPagoApiKey);
    }
  } catch (error) {
    console.error("Error al inicializar MercadoPago:", error);
    throw error;
  }
};
