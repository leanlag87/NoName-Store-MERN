/**
 * Formatea la fecha de creación del usuario usando toLocaleString.
 * @param {Object} user - Objeto usuario que debe tener la propiedad createdAt.
 * @returns {string} Fecha formateada.
 */
export function formatCreatedAt(user) {
  // Si el usuario no tiene createdAt, devolver un mensaje por defecto
  if (!user || !user.createdAt) {
    return "Fecha no disponible";
  }

  try {
    const createdAtDate = new Date(user.createdAt);
    console.log("Fecha en UTC:", createdAtDate.toUTCString());

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Argentina/Buenos_Aires",
    };

    return createdAtDate.toLocaleString("es-AR", options);
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return "Fecha no disponible";
  }
}
