import { Pagination } from "./pagination.js";
// ------------------------------ Variables ------------------------------
const apiUrl = 'http://localhost:3000';
const nombreEmpresa = 'Luciano Iluminación';
const sectionProductos = document.getElementById("section-productos");
const divProducts = document.getElementById('products');
const categoriaA = "Farol";
const categoriaB = "Plafon";
const response = await fetch(apiUrl + "/producto");
const productos = await response.json();

// ------------------------------ Functions ------------------------------
function obtenerTema() {
  return localStorage.getItem('tema');
}
function cambiarTema() {
  let tema = localStorage.getItem('tema');
  if (tema === null || tema === 'claro') {
    localStorage.setItem('tema', 'oscuro');
    document.documentElement.classList.add('oscuro');
  } else if (tema === 'oscuro') {
    localStorage.setItem('tema', 'claro');
    document.documentElement.classList.remove('oscuro');
  } else {
    console.log('Algo salió mal');
  }
}

async function ingresar(inputNombre, mensajeElement) {
  const nombre = inputNombre.value;
  if (nombre.length === 0) {
    mensajeElement.innerText = "Por favor, ingrese su nombre...";
  } else {
    mensajeElement.innerText = "";
    localStorage.setItem("cliente", nombre);
    location.replace("./productos.html");
  }
}

async function irALogin() {
  const  response = await fetch(apiUrl + '/administrator')
  location.assign(response.url);
}


const page = Pagination({
  limit: 10,
  baseURL: "http://localhost:3000/producto",
  containerId: "products",

  // cómo dibujar un producto
  renderItem: (p) => {
    const card = document.createElement('div');
    card.classList.add("product-card");
    const div = document.createElement('div');


    div.id = `div-producto-${p.id}`;
    div.classList.add('product');
    div.innerHTML = `
      <img src="http://localhost:3000/uploads/${p.imagen}">
      <p class="product-name">${p.nombre}</p>
      <p class="product-price">$${p.precio}</p>
      <p class="cuotas-p">6 cuotas sin interés de $${(p.precio / 6).toFixed(2)}</p>
      ${estaGuardado(p.id) 
      ? `<button id="btn-quitar-${p.id}">Quitar del carrito</button>` 
      : `<button id="btn-agregar-${p.id}">Agregar al carrito</button>`}
    `;

    card.appendChild(div);


    const btnAgregar = div.querySelector(`#btn-agregar-${p.id}`);
    const btnQuitar  = div.querySelector(`#btn-quitar-${p.id}`);

    if (btnAgregar) {
      btnAgregar.addEventListener("click", () => {
        guardarProducto(p);
        page.render();
        Toastify({
          text: '¡Producto guardado exitosamente!',
          duration: 3000,
          destination: 'https://github.com/apvarun/toastify-js',
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: '#0e87beff',
          },
          onClick: function () {},
        }).showToast();
      });
    }

    if (btnQuitar) {
      btnQuitar.addEventListener("click", () => {
        quitarProducto(p);
        page.render();
        Toastify({
          text: '¡Producto eliminado exitosamente!',
          duration: 3000,
          destination: 'https://github.com/apvarun/toastify-js',
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: '#0e87beff',
          },
          onClick: function () {},
        }).showToast();
      });
    }
    return card;
  }
});

function mostrarGuardados() {
  let precioTotal = 0;
  let arrayId = [];
  eliminarElementos(divProducts);
  const productos = traerGuardados();
  if (productos.length === 0) {
    divProducts.innerText = 'No hay productos en el carrito';
    document.getElementById('precio-total').style.display = 'none';
    document.getElementById('btn-finalizar-compra').style.display = 'none';
  } else {
    divProducts.innerText = '';
    document.getElementById('precio-total').style.display = 'block';
    document.getElementById('btn-finalizar-compra').style.display = 'block';
    for (let p of productos) {
      let div = crearCardCarrito(p);
      divProducts.appendChild(div);

      let btnQuitar = document.getElementById(`btn-quitar-${p.id}`);
      let btnRestar = document.getElementById(`btn-restar-${p.id}`);
      let spanCantidad = document.getElementById(`span-cantidad-${p.id}`);
      let btnSumar = document.getElementById(`btn-sumar-${p.id}`);
      let precioTotalElement = document.getElementById('precio-total');

      btnQuitar.addEventListener("click", () => {
        quitarProducto(p);
        window.location.reload();
      });

      if (btnRestar) {
        btnRestar.addEventListener("click", () => {
          if (p.cantidad > 1) {
            p.cantidad--;
            localStorage.setItem("productos", JSON.stringify(productos));
            spanCantidad.innerText = p.cantidad;
            precioTotal = precioTotal - parseFloat(p.precio);
            precioTotalElement.innerText = `Precio total: $${precioTotal}`;
          }
        });
      }
      if (btnSumar) {
        btnSumar.addEventListener("click", () => {
          p.cantidad++;
          localStorage.setItem("productos", JSON.stringify(productos));
          spanCantidad.innerText = p.cantidad;
          precioTotal = precioTotal + parseFloat(p.precio);
          precioTotalElement.innerText = `Precio total: $${precioTotal}`;
        });
      }

      precioTotal += parseFloat(p.precio);
      arrayId.push(p.id);
    }
  }
  return { precioTotal, arrayId };
}

function crearCardCarrito(producto) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  const div = document.createElement("div");
  div.id = `div-producto-${producto.id}`;
  div.classList.add('product');
  div.innerHTML = `
  <img src="${apiUrl}/uploads/${producto.imagen}">
  <p class="product-name">${producto.nombre}</p>
  <p class="product-price">$${producto.precio}</p>
  <p class="cuotas-p">6 cuotas sin interés de $${(producto.precio / 6).toFixed(2)}</p>
  <div class="card-buttons">
    <div class="div-quitar">
      <button id="btn-quitar-${producto.id}">Quitar del carrito</button>
    </div>
    <div class="div-cantidad">
      <button id="btn-restar-${producto.id}">-</button>
      <span id="span-cantidad-${producto.id}">${producto.cantidad}</span>
      <button id="btn-sumar-${producto.id}">+</button>
    </div>
  </div>
  `;
  card.appendChild(div);
  return card;
}

const confirmarCompra = () => Swal.fire({
  title: "¿Está seguro que desea confirmar la compra?",
  text: "¡No se aceptan devoluciones!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si",
  cancelButtonText: "No"
});

function mostrarProductosTicket(tableBody, precioTotalElement) {
  const productosCarrito = traerGuardados();
  let total = 0;
  for (let p of productosCarrito) {
    const tr = crearCardTicket(p);
    tableBody.appendChild(tr);
    total += p.cantidad * p.precio;
  }
  precioTotalElement.innerText = `$${total}`;
  return total;
}

function crearCardTicket(producto) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${producto.cantidad}</td>
  <td>${producto.nombre}</td>
  <td>$${producto.precio}</td>
  <td class="id" id="total-${producto.id}">$${producto.cantidad * producto.precio}</td>
  `;
  return tr;
}

function mostrarProductos(categoria) {
  eliminarElementos(sectionProductos);
  if (productos.length === 0) {
    sectionProductos.innerText = "No hay productos en la base de datos";
  } else {
    sectionProductos.innerText = "";
    for (let p of productos) {
      if (p.activo && categoria === p.categoria) {
        const div = crearCard(p);
        sectionProductos.appendChild(div);
  
        if (estaGuardado(p.id)) {
          const btnQuitar = document.getElementById(`btn-quitar-${p.id}`);
          btnQuitar.addEventListener("click", () => {
            quitarProducto(p);
            window.location.reload();
          });
        } else {
          const btnAgregar = document.getElementById(`btn-agregar-${p.id}`);
          btnAgregar.addEventListener("click", () => {
            guardarProducto(p);
            window.location.reload();
          });
        }
      } else {
        continue;
      }
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
  ${estaGuardado(producto.id) ? `<button id="btn-quitar-${producto.id}">Quitar del carrito</button>` : `<button id="btn-agregar-${producto.id}">Agregar al carrito</button>`}
  `;
  return div;
}

function eliminarElementos(contenedor) {
  while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
}

function traerGuardados() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProducto(nuevoProducto) {
  let productos = traerGuardados();
  productos.push(nuevoProducto);
  localStorage.setItem("productos", JSON.stringify(productos));
}

function estaGuardado(id) {
  const productos = traerGuardados();
  for (let p of productos) {
    if (id === p.id) return true;
  }
  return false;
}

function quitarProducto(producto) {
  let productos = traerGuardados();
  const index = obtenerPosicion(producto);
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
}

function obtenerPosicion(producto) {
  const productos = traerGuardados();
  let index = 0;
  for (let p of productos) {
    if (p.id === producto.id) break;
    index++;
  }
  return index;
}

export {
  apiUrl,
  nombreEmpresa,
  sectionProductos,
  categoriaA,
  categoriaB,
  productos,
  obtenerTema,
  cambiarTema,
  ingresar,
  irALogin,
  page,
  mostrarGuardados,
  mostrarProductos,
  confirmarCompra,
  mostrarProductosTicket,
  crearCardTicket,
  crearCard,
  eliminarElementos,
  traerGuardados,
  guardarProducto,
  estaGuardado,
  quitarProducto,
  obtenerPosicion,
};