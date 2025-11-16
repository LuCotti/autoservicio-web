import { apiUrl } from './variables.js';
const btnCancelar = document.getElementById("btn-cancelar");
const formAgregar = document.getElementById('form-agregar');

btnCancelar.onclick = () => {
  location.replace("/administrator/dashboard");
};

formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarProducto();
});

async function agregarProducto() {
  const formData = new FormData(formAgregar);

  try {
    const response = await fetch(`${apiUrl}/producto`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.log('Error: faltan datos');
    } else {
      location.assign('/administrator/dashboard');
    }
  } catch(error) {
    console.log('Error:', error);
  }
}