import { serverUrl } from './variables.js';
const formAgregar = document.getElementById('form-agregar');

formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarProducto();
});

async function agregarProducto() {
  const formData = new FormData(formAgregar);

  try {
    const response = await fetch(`${serverUrl}/producto`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.log('Error: faltan datos');
    } else {
      location.href = '/administrator/dashboard';
    }
  } catch(error) {
    console.log('Error:', error);
  }
}