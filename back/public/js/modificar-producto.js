import { cambiarTema, modificarProducto } from "./utils/funciones-variables.js";
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById('btn-cancelar');
const formModificar = document.getElementById('form-modificar');

btnTema.onclick = cambiarTema;

btnCancelar.onclick = () => {
  location.assign('/administrator/dashboard');
};

formModificar.addEventListener("submit", (e) => {
  e.preventDefault();
  modificarProducto(formModificar);
});