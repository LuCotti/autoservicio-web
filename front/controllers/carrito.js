import { apiUrl, sectionProductos, eliminarElementos, traerGuardados, quitarProducto } from './funciones-variables.js';
const btnTema = document.getElementById("btn-tema");
const btnProductos = document.getElementById("btn-productos");
const btnCarrito = document.getElementById("btn-carrito");
const btnSalir = document.getElementById("btn-salir");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

btnProductos.onclick = () => {
  location.assign("./productos.html");
};

btnCarrito.onclick = () => {
  location.reload();
};

btnSalir.onclick = () => {
  localStorage.clear();
  location.replace("./bienvenida.html");
};

btnFinalizarCompra.onclick = () => {
  window.location.replace("./ticket.html");
}

mostrarGuardados();

function mostrarGuardados() {
  eliminarElementos(sectionProductos);
  const productos = traerGuardados();
  if (productos.length === 0) {
    sectionProductos.innerText = "No hay productos en el carrito";
    btnFinalizarCompra.hidden = true;
  } else {
    sectionProductos.innerText = "";
    for (let p of productos) {
      let div = crearCard(p);
      sectionProductos.appendChild(div);

      let btnQuitar = document.getElementById(`btn-quitar-${p.id}`);
      let btnRestar = document.getElementById(`btn-restar-${p.id}`);
      let spanCantidad = document.getElementById(`span-cantidad-${p.id}`);
      let btnSumar = document.getElementById(`btn-sumar-${p.id}`);

      btnQuitar.addEventListener("click", () => {
        quitarProducto(p);
        window.location.reload();
      });

      btnRestar.addEventListener("click", () => {
        if (p.cantidad > 1) {
          p.cantidad--;
          localStorage.setItem("productos", JSON.stringify(productos));
          spanCantidad.innerText = p.cantidad;
        }
      });
      btnSumar.addEventListener("click", () => {
        p.cantidad++;
        localStorage.setItem("productos", JSON.stringify(productos));
        spanCantidad.innerText = p.cantidad;
      });
    }
  }
}


function crearCard(producto) {
  const div = document.createElement("div");
  div.id = `div-producto-${producto.id}`;
  div.innerHTML = `
  <img src="${apiUrl}/uploads/${producto.imagen}">
  <p>Producto Nº: ${producto.id}</p>
  <p>Nombre: ${producto.nombre}</p>
  <p>Precio: ${producto.precio}</p>
  <button id="btn-quitar-${producto.id}">Quitar del carrito</button>
  <button id="btn-restar-${producto.id}">-</button>
  <span id="span-cantidad-${producto.id}">${producto.cantidad}</span>
  <button id="btn-sumar-${producto.id}">+</button>
  `;
  return div;
}