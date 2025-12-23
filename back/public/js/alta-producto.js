import { cambiarTema, agregarProducto } from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById('btn-cancelar');
const formAgregar = document.getElementById('form-agregar');
const params = new URLSearchParams(location.search);
const view = params.get('view');

btnTema.addEventListener('click', () => {
  cambiarTema();
});

btnCancelar.addEventListener('click', () => {
  location.replace(`/administrator/dashboard?view=${view}`);
});

formAgregar.addEventListener('submit', (e) => {
  e.preventDefault();
  agregarProducto(formAgregar);
});

const inputFile = document.getElementById('imagen');
const fileName = document.getElementById('file-name');
const imagePreview = document.getElementById('image-preview');

inputFile.addEventListener('change', () => {
  const file = inputFile.files[0];
  if (!file) {
    fileName.textContent = 'No se ha seleccionado ningún archivo';
    imagePreview.style.display = 'none';
  } else {
    fileName.textContent = inputFile.files[0].name;
    imagePreview.src = URL.createObjectURL(file);
    imagePreview.style.display = 'block';
  }
});
