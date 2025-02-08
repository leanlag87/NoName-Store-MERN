// Display money en Pesos Argentinos
export const displayMoney = (num) => {
  if (!num) return "ARS 0"; // Manejo de valores nulos o undefined

  const numFormate = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(num / 100);

  // El numFormate ya es el string formateado, no necesitas .format
  const arr = numFormate.split(",", 1);
  return arr[0];
};

// Calcular el porcentaje de descuento
export const calculateDiscount = (discountPrice, originalPrice) => {
  if (!discountPrice || !originalPrice) return 0;
  const discountPercent = (discountPrice / originalPrice) * 100;
  return discountPercent;
};

// Calcular el importe total
export const calculateTotal = (arr) => {
  if (!Array.isArray(arr)) return 0;
  const total = arr.reduce((accum, curr) => accum + curr, 0);
  return total;
};

// Generar un descuento en el precio
export const generateDiscountedPrice = (price) => {
  if (!price) return "0.00";
  const discountPercentage = 35;
  const discountAmount = (discountPercentage / 100) * price;
  const discountedPrice = price - discountAmount;
  return discountedPrice.toFixed(2);
};
