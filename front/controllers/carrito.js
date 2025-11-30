import { cambiarTema, apiUrl, mostrarGuardados, confirmarCompra } from './utils/funciones-variables.js';
const btnTema = document.getElementById("btn-tema");
const btnProductos = document.getElementById("btn-productos");
const btnCarrito = document.getElementById("btn-carrito");
const btnSalir = document.getElementById("btn-salir");
const precioTotalElement = document.getElementById('precio-total');
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
const nombreCliente = localStorage.getItem("cliente");
const { precioTotal, arrayId } = mostrarGuardados();
precioTotalElement.innerText = `Precio total: $${precioTotal}`;
btnTema.onclick = cambiarTema;

btnProductos.onclick = () => {
  location.assign("./productos.html");
};

btnCarrito.onclick = () => {
  location.reload();
};

btnSalir.onclick = () => {
  localStorage.removeItem('cliente');
  localStorage.removeItem('productos');
  location.replace("./bienvenida.html");
};

btnFinalizarCompra.onclick = async () => {
  confirmarCompra().then(async (result) => {
    if (result.isConfirmed) {
      const body = {
        nombreCliente: nombreCliente,
        fecha: new Date(),
        precioTotal: precioTotal,
        productos: arrayId
      };
      const ventaRegistrada = await fetch(`${apiUrl}/venta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    
      if (ventaRegistrada.ok) {
        location.replace("./ticket.html");
      } else {
        console.log("Error al registrar la venta");
      }
    }
  });
}
