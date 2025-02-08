/**
 * Formatea la fecha de creación del usuario usando Intl.DateTimeFormat.
 * @param {Object} user - Objeto usuario que debe tener la propiedad createdAt.
 * @returns {string} Fecha formateada.
 */
export function formatCreatedAt(user) {
  const createdAtDate = new Date(user.createdAt);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Argentina/Buenos_Aires",
  };

  const formatter = new Intl.DateTimeFormat("es-AR", options);
  return formatter.format(createdAtDate);
}
