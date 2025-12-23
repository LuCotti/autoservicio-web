import {
  cambiarTema,
  irALogin,
  apiUrl,
  mostrarGuardados,
  confirmarCompra,
} from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnAdministrador = document.getElementById('btn-administrador');
const btnProductos = document.getElementById('btn-productos');
const btnCarrito = document.getElementById('btn-carrito');
const btnSalir = document.getElementById('btn-salir');
const divProducts = document.getElementById('products');
const precioTotalElement = document.getElementById('precio-total');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
const nombreCliente = localStorage.getItem('cliente');
const { precioTotal, arrayId } = mostrarGuardados(divProducts);
precioTotalElement.innerText = `Precio total: $${precioTotal}`;

btnTema.addEventListener('click', () => {
  cambiarTema();
});

btnAdministrador.addEventListener('click', () => {
  irALogin('carrito.html');
});

btnProductos.addEventListener('click', () => {
  location.assign('./productos.html');
});

btnCarrito.addEventListener('click', () => {
  location.reload();
});

btnSalir.addEventListener('click', () => {
  localStorage.removeItem('cliente');
  localStorage.removeItem('productos');
  location.replace('./bienvenida.html');
});

btnFinalizarCompra.addEventListener('click', async () => {
  confirmarCompra().then(async (result) => {
    if (result.isConfirmed) {
      const body = {
        nombreCliente: nombreCliente,
        fecha: new Date(),
        precioTotal: precioTotal,
        productos: arrayId,
      };
      const ventaRegistrada = await fetch(`${apiUrl}/venta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (ventaRegistrada.ok) {
        location.replace('./ticket.html');
      } else {
        console.log('Error al registrar la venta');
      }
    }
  });
});
