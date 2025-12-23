import { cambiarTema, frontUrl, apiUrl } from './utils/funciones-variables.js';
const btnTema = document.getElementById('btn-tema');
const btnSalir = document.getElementById('btn-salir');
const inputMail = document.getElementById('input-mail');
const inputClave = document.getElementById('input-clave');
const btnIngresar = document.getElementById('btn-ingresar');
const btnRegistrar = document.getElementById('btn-registrar');
const params = new URLSearchParams(location.search);
const view = params.get('view');

btnTema.onclick = cambiarTema;

btnSalir.onclick = () => {
  location.href = frontUrl + `/front/views/${view}`;
};

btnIngresar.addEventListener('click', async () => {
  const mail = inputMail.value;
  const pass = inputClave.value;
  const mensaje = document.getElementById('p-mensaje');
  if (!mail || !pass) {
    mensaje.innerText = 'Por favor, ingrese todos los datos...';
  } else {
    mensaje.innerText = '';

    try {
      const response = await fetch(`${apiUrl}/administrator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, pass }),
      });

      if (response.ok) {
        const data = await response.json();
        location.href = `${data.redirectTo}?view=${view}`;
      } else {
        const errorData = await response.json();
        mensaje.innerText = errorData.error || 'Email o contraseña incorrectos';
      }
    } catch (error) {
      // Error de red o algo falló en la conexión
      console.error('Error de red:', error);
      mensaje.innerText =
        'No se pudo conectar al servidor. Inténtalo de nuevo.';
    }
  }
});

btnRegistrar.addEventListener('click', () => {
  location.href = `/administrator/register?view=${view}`
});