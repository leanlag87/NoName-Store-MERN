const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app"); //importo mi app

//variables de entorno
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const apiVersion = process.env.API_VERSION;
const ipeServer = process.env.IP_SERVER;
const port = process.env.PORT_SERVER;


//const portDB = process.env.PORT_DB || 3977; //para cuando haga el deploy, si no hay puerto en .env, se usará el 3977

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/`);
    app.listen(port, () => {
      console.log("<><><><><><><><><><><><><><><>");
      console.log("<><><><><><>< API ><><><><><><");
      console.log("<><><><><><><><><><><><><><><>");
      console.log(`http://${ipeServer}:${port}/api/${apiVersion}/`);
    });
  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
  }
};

connectDB();
