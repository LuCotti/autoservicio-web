import {
  nombreEmpresa,
  obtenerTema,
  cambiarTema,
  apiUrl,
  traerGuardados,
  mostrarProductosTicket,
} from './utils/funciones-variables.js';
const body = document.getElementsByTagName('body')[0];
const btnTema = document.getElementById('btn-tema');
const clienteElement = document.getElementById('cliente');
const fechaElement = document.getElementById('fecha');
const empresaElement = document.getElementById('empresa');
const sectionTicket = document.getElementById('section-ticket');
const tableBody = document.getElementById('table-body');
const precioTotalElement = document.getElementById('precio-total');
const btnDescargar = document.getElementById('btn-descargar');
const btnSalir = document.getElementById('btn-salir');
const productosCarrito = traerGuardados();
const nombreCliente = localStorage.getItem('cliente');
const fecha = new Date().toLocaleString();
let precioTotal = mostrarProductosTicket(tableBody, precioTotalElement);

let tema = obtenerTema();
if (tema === 'oscuro') body.classList.add('oscuro');

btnTema.onclick = cambiarTema;

clienteElement.innerText = `Cliente: ${nombreCliente}`;
fechaElement.innerText = `Fecha: ${fecha}`;
empresaElement.innerText = `Empresa: ${nombreEmpresa}`;

btnDescargar.onclick = async () => {
  try {
    const body = {
      nombreCliente: nombreCliente,
      fecha: fecha,
      nombreEmpresa: nombreEmpresa,
      productosCarrito: productosCarrito,
      precioTotal: precioTotal,
    };
    const response = await fetch(`${apiUrl}/venta/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log('¡Error en la petición!');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.pdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

btnSalir.onclick = async () => {
  localStorage.removeItem('cliente');
  localStorage.removeItem('productos');
  location.replace('./bienvenida.html');
};
