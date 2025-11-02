import { sectionProductos, categoriaA, categoriaB, eliminarElementos, traerGuardados, guardarProducto, estaGuardado, quitarProducto, obtenerPosicion } from './funciones-variables.js';

const btnTema = document.getElementById("btn-tema");
const sectionTicket = document.getElementById("section-ticket");
const tableBody = document.getElementById("table-body");
const precioTotalElement = document.getElementById("precio-total");
const btnDescargar = document.getElementById("btn-descargar");
const btnSalir = document.getElementById("btn-salir");
const productos = traerGuardados();


btnSalir.onclick = () => {
  localStorage.clear();
  window.location.replace("./bienvenida.html");
}

mostrarProductos();

function mostrarProductos() {
  let total = 0;
  for (let p of productos) {
    const tr = crearCard(p);
    tableBody.appendChild(tr);
    total += Number.parseInt(document.getElementById(`total-${p.id}`).innerText);
  }
  precioTotalElement.innerText = `$ ${total}`;
}

function crearCard(producto) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${producto.cantidad}</td>
  <td>${producto.nombre}</td>
  <td>${producto.precio}</td>
  <td id="total-${producto.id}">${producto.cantidad * producto.precio}</td>
  `;
  return tr;
}