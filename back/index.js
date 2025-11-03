const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const administratorRouter = require("./routes/administrador.routes.js");
const productosRouter = require("./routes/producto.routes.js");

app.disable('x-powered-by');
app.use(express.json());
app.use(cors())







app.use("/administrator", administratorRouter);
app.use("/producto", productosRouter);








app.listen(port, () => {
  console.log(`El server levantó en el puerto ${port}`);
})