import { obtenerTema, cambiarTema, estaGuardado, quitarProducto, guardarProducto, categoriaA, categoriaB, mostrarProductos } from './funciones-variables.js';
import { Pagination } from "./utils/pagination.js";
const body = document.getElementsByTagName('body')[0];
const btnTema = document.getElementById("btn-tema");
const btnProductos = document.getElementById("btn-productos");
const btnCarrito = document.getElementById("btn-carrito");
const btnSalir = document.getElementById("btn-salir");
const btnFaroles = document.getElementById("btn-faroles");
const btnPlafones = document.getElementById("btn-plafones");
const btnPaginaAnterior = document.getElementById("btn-pagina-anterior");
const btnPaginaSiguiente = document.getElementById("btn-pagina-siguiente");

let tema = obtenerTema();
if (tema === 'oscuro') body.classList.add('oscuro');

btnTema.onclick = cambiarTema;

btnProductos.onclick = () => {
  location.reload();
};

btnCarrito.onclick = () => {
  location.assign("./carrito.html");
};

btnSalir.onclick = () => {
  localStorage.clear();
  location.replace("./bienvenida.html");
};


btnFaroles.onclick = () => {
  //mostrarProductos(categoriaA);

  page.setCategory("Farol");
};

btnPlafones.onclick = () => {
  //mostrarProductos(categoriaB);

  page.setCategory("Plafon");
};



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
      <p>Producto Nº: ${p.id}</p>
      <p>Nombre: ${p.nombre}</p>
      <p>$${p.precio},00</p>
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
      });
    }

    if (btnQuitar) {
      btnQuitar.addEventListener("click", () => {
        quitarProducto(p);
        page.render(); 
      });
    }
    return card;
  }
});

// Controles
document.getElementById("nextBtn").onclick = page.next;
document.getElementById("prevBtn").onclick = page.prev;

// Primera carga
page.render();