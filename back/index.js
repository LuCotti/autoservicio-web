const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const administradorRouter = require("./routes/administrador.routes.js");
const productoRouter = require("./routes/producto.routes.js");
const ventaRouter = require("./routes/venta.routes.js");


app.disable('x-powered-by');
app.use(express.json());
app.use(cors('*'))
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", "./views"); 

app.use("/administrator", administradorRouter);
app.use("/producto", productoRouter);
app.use("/venta", ventaRouter);


app.listen(port, () => {
  console.log(`El server levantó en el puerto ${port}`);
})