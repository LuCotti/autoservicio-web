import { cambiarTema, agregarProducto } from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById("btn-cancelar");
const formAgregar = document.getElementById('form-agregar');

btnTema.onclick = cambiarTema;

btnCancelar.onclick = () => {
  location.replace("/administrator/dashboard");
};

formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarProducto(formAgregar);
});