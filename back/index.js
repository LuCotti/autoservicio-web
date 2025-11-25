const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const administradorRouter = require('./routes/administrador.routes');
const productoRouter = require('./routes/producto.routes');
const ventaRouter = require('./routes/venta.routes');

app.disable('x-powered-by');
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5500', 'http://127.0.0.1:5500'] }));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use('/administrator', administradorRouter);
app.use('/producto', productoRouter);
app.use('/venta', ventaRouter);

app.listen(port, () => {
  console.log(`El server levantó en el puerto ${port}`);
});