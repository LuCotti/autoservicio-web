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
  localStorage.clear();
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
<<<<<<< HEAD
}


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

      precioTotal += p.precio;
      arrayId.push(p.id);
    }
  }
}


function crearCard(producto) {
  const div = document.createElement("div");
  div.id = `div-producto-${producto.id}`;
  div.classList.add("product-card");
  div.innerHTML = `
  <img src="${apiUrl}/uploads/${producto.imagen}">
  <p class="product-name">${producto.nombre}</p>
  <p class="product-price">$${producto.precio},00</p>

  <div class="buttons">
    <button class="btn-quitar" id="btn-quitar-${producto.id}">Quitar del carrito</button>
    <div class="cantidad">
      <button id="btn-restar-${producto.id}">-</button>
      <span id="span-cantidad-${producto.id}">${producto.cantidad}</span>
      <button id="btn-sumar-${producto.id}">+</button>
    </div>
  </div>
  `;
  return div;
}

const confirmar = () => Swal.fire({
  title: "¿Está seguro que desea confirmar la compra?",
  text: "¡No se aceptan devoluciones!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si",
  cancelButtonText: "No"
});
=======
}
>>>>>>> 41eb177a1e65dc0ccc40999d68181e0e02701769
