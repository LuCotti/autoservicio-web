import express from 'express';
const app = express();
import cors from 'cors';
const PORT = process.env.PORT;
import administradorRouter from './routes/administrador.routes.js';
import productoRouter from './routes/producto.routes.js';
import ventaRouter from './routes/venta.routes.js';
import path from 'path';

app.disable('x-powered-by');
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5500',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5500',
      'https://autoservicio-web-back.onrender.com',
      'https://autoservicio-web.vercel.app',
    ],
    credentials: true,
  })
);
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
// app.set('views', './views');
app.set('views', path.join(process.cwd(), 'views'));

app.use('/administrator', administradorRouter);
app.use('/producto', productoRouter);
app.use('/venta', ventaRouter);

app.listen(PORT, () => {
  console.log(`El server levantó en el puerto ${PORT}`);
});
