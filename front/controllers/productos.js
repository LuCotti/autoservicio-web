import { cambiarTema, irALogin, page } from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnAdministrador = document.getElementById('btn-administrador');
const btnProductos = document.getElementById('btn-productos');
const btnCarrito = document.getElementById('btn-carrito');
const btnSalir = document.getElementById('btn-salir');
const btnFaroles = document.getElementById('btn-faroles');
const btnPlafones = document.getElementById('btn-plafones');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Primera carga
page.render();

btnTema.addEventListener('click', () => {
  cambiarTema();
});

btnAdministrador.addEventListener('click', () => {
  irALogin('productos.html');
});

btnProductos.addEventListener('click', () => {
  location.reload();
});

btnCarrito.addEventListener('click', () => {
  // location.href = './carrito.html';
  location.href = '/views/carrito.html';
});

btnSalir.addEventListener('click', () => {
  localStorage.removeItem('cliente');
  localStorage.removeItem('productos');
  // location.href = './bienvenida.html';
  location.href = '/views/bienvenida.html';
});

btnFaroles.addEventListener('click', () => {
  page.setCategory('Farol');
});

btnPlafones.addEventListener('click', () => {
  page.setCategory('Plafon');
});

// Controles
nextBtn.addEventListener('click', () => {
  page.next();
});

prevBtn.addEventListener('click', () => {
  page.prev();
});
