import { cambiarTema, mostrarProductos, categoriaA, categoriaB } from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const btnFaroles = document.getElementById('btn-faroles');
const btnPlafones = document.getElementById('btn-plafones');
const sectionProductos = document.getElementById('section-productos');

btnTema.onclick = cambiarTema;

btnAgregarProducto.onclick = () => {
  location.assign('/producto/alta');
};

btnCerrarSesion.onclick = () => {
  location.replace('/administrator');
};

btnFaroles.onclick = () => {
  mostrarProductos(categoriaA, sectionProductos);
};

btnPlafones.onclick = () => {
  mostrarProductos(categoriaB, sectionProductos);
};