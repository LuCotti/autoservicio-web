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

  const inputFile = document.getElementById("imagen");
  const fileName = document.getElementById("file-name");

  inputFile.addEventListener("change", () => {
    fileName.textContent =
      inputFile.files.length > 0 
        ? inputFile.files[0].name 
        : "No se ha seleccionado ningún archivo";
  });