const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Crear un transportador (transporter) utilizando un servicio de correo electrónico (como Gmail, Outlook, etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2. Definir las opciones del correo electrónico
  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // 3. Enviar el correo electrónico
  const info = await transporter.sendMail(mailOptions);

  console.log("Mensaje enviado: %s", info.messageId);
};

module.exports = sendEmail;
