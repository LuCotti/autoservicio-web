const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const administratorRouter = require("./routes/administrador.js");

app.disable('x-powered-by');
app.use(express.json());
app.use(cors())







app.use("/administrator", administratorRouter);








app.listen(port, () => {
  console.log(`El server levantó en el puerto ${port}`);
})