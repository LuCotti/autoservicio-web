import { cambiarTema } from "./utils/funciones-variables.js";

const params = new URLSearchParams(location.search);
const view = params.get('view');
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById('btn-cancelar');
const formRegistrar = document.getElementById('form-registrar');
const mensajeElement = document.getElementById('p-mensaje');

btnTema.addEventListener('click', () => {
  cambiarTema();
});

btnCancelar.addEventListener('click', () => {
  location.href = `/administrator?view=${view}`;
});

formRegistrar.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const pass1 = document.getElementById('pass1').value;
  const pass2 = document.getElementById('pass2').value;

  // Validaciones
  if (!email || !pass1 || !pass2) {
    mensajeElement.innerText = 'Ingrese todos los datos.';
    return;
  }
  if (pass1 !== pass2) {
    mensajeElement.innerText = 'La contraseña debe coincidir en ambos campos.';
    return;
  }

  mensajeElement.innerText = '';
  const body = {
    email: email,
    password: pass1,
  };
  const response = await fetch(`/administrator/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json();
    console.error(response.status, response.statusText);
    console.error(data.message);
  } else {
    location.href = `/administrator?view=${view}`;
  }
});