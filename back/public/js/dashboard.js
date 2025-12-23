import {
  cambiarTema,
  mostrarProductos,
  categoriaA,
  categoriaB,
} from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const btnFaroles = document.getElementById('btn-faroles');
const btnPlafones = document.getElementById('btn-plafones');
const sectionProductos = document.getElementById('section-productos');
const params = new URLSearchParams(location.search);
const view = params.get('view');

btnTema.addEventListener('click', () => {
  cambiarTema();
});

btnAgregarProducto.addEventListener('click', () => {
  location.assign(`/producto/alta?view=${view}`);
});

btnCerrarSesion.addEventListener('click', () => {
  location.replace(`/administrator?view=${view}`);
});

btnFaroles.addEventListener('click', () => {
  mostrarProductos(categoriaA, sectionProductos);
});

btnPlafones.addEventListener('click', () => {
  mostrarProductos(categoriaB, sectionProductos);
});
