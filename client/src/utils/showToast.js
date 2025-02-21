import { toast } from "react-toastify";

export const showToast = {
  error: (
    message,
    skipMessages = ["No autorizado", "Error al cargar usuario"]
  ) => {
    if (!skipMessages.includes(message)) {
      toast.error(message);
    }
  },
  success: (message) => toast.success(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warning(message),
};
