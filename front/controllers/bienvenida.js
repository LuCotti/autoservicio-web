import {
  cambiarTema,
  ingresar,
  irALogin,
} from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnIngresar = document.getElementById('btn-ingresar');
const inputNombre = document.getElementById('input-nombre');
const mensajeElement = document.getElementById('p-mensaje');
const btnAdministrador = document.getElementById('btn-administrador');

btnTema.addEventListener('click', () => {
  cambiarTema();
});

btnIngresar.addEventListener('click', () => {
  ingresar(inputNombre, mensajeElement);
});

btnAdministrador.addEventListener('click', () => {
  irALogin('bienvenida.html');
});
