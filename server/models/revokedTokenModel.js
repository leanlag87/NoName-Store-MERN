const mongoose = require("mongoose");

// Modelo de datos para los tokens revocados
const revokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // Token expira después de 7 días
  },
});

module.exports = mongoose.model("RevokedToken", revokedTokenSchema);
