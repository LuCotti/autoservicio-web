import { categoriaA, categoriaB, mostrarProductos } from './funciones-variables.js';
const btnTema = document.getElementById("btn-tema");
const btnProductos = document.getElementById("btn-productos");
const btnCarrito = document.getElementById("btn-carrito");
const btnSalir = document.getElementById("btn-salir");
const btnFaroles = document.getElementById("btn-faroles");
const btnPlafones = document.getElementById("btn-plafones");
const btnPaginaAnterior = document.getElementById("btn-pagina-anterior");
const btnPaginaSiguiente = document.getElementById("btn-pagina-siguiente");

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
  mostrarProductos(categoriaA);
};

btnPlafones.onclick = () => {
  mostrarProductos(categoriaB);
};