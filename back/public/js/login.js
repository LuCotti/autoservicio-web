import { frontUrl, apiUrl } from './variables.js';
const btnSalir = document.getElementById('btn-salir');
const inputMail = document.getElementById("input-mail");
const inputClave = document.getElementById("input-clave");
const btnIngresar = document.getElementById('btn-ingresar');
const btnAccesoRapido = document.getElementById("btn-acceso-rapido");

btnSalir.onclick = () => {
  location.assign(frontUrl + '/front/views/bienvenida.html');
};

btnAccesoRapido.addEventListener("click", () => {
  inputMail.value = "gonza@admin.com";
  inputClave.value = "Inicio1234.";
});

btnIngresar.addEventListener("click", async() => {
  const mail = document.getElementById("input-mail").value;
  const pass = document.getElementById("input-clave").value;
  const mensaje = document.getElementById("p-mensaje");
  if (mail.length === 0 || pass.length === 0) {
    mensaje.innerText = "Por favor, ingrese todos los datos...";
  } else {
    mensaje.innerText = "";

    try {
      const response = await fetch(`${apiUrl}/administrator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail, pass })
      });

      if (response.ok) {
        // Éxito (status 200)
        const data = await response.json();

        //window.location.href = './dashboard.ejs'; 
        console.log(data);
        window.location.href = data.redirectTo;
      } else {
        // Error (Ej: status 401 o 400)
        const errorData = await response.json();
        mensaje.innerText = errorData.error || 'Email o contraseña incorrectos';
      }

    } catch (error) {
      // Error de red o algo falló en la conexión
      console.error('Error de red:', error);
      mensaje.innerText = 'No se pudo conectar al servidor. Inténtalo de nuevo.';
    }
  }
});