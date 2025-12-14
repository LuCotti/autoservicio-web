import { cambiarTema, modificarProducto } from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById('btn-cancelar');
const formModificar = document.getElementById('form-modificar');
const currentImageElement = document.getElementById('current-image');
const fileName = document.getElementById('file-name');
const inputImage = document.getElementById('imagen');
const params = new URLSearchParams(location.search);
const view = params.get('view');

btnTema.onclick = cambiarTema;

btnCancelar.onclick = () => {
  location.assign(`/administrator/dashboard?view=${view}`);
};

inputImage.addEventListener('change', () => {
  const file = inputImage.files[0];
  if (!file) {
    fileName.textContent = 'No se ha seleccionado ningún archivo.';
    currentImageElement.style.display = 'none';
  } else {
    fileName.textContent = inputImage.files[0].name;
    currentImageElement.src = URL.createObjectURL(file);
    currentImageElement.style.display = 'block';
  }
});

formModificar.addEventListener('submit', (e) => {
  e.preventDefault();
  modificarProducto(formModificar);
});
