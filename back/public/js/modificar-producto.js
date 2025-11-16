import { apiUrl } from "./variables.js";
const btnCancelar = document.getElementById('btn-cancelar');
const formModificar = document.getElementById('form-modificar');

btnCancelar.onclick = () => {
  location.assign('/administrator/dashboard');
};

formModificar.addEventListener("submit", (e) => {
  e.preventDefault();
  modificarProducto();
});

async function modificarProducto() {
  const id = document.getElementById("productoId").value;
  const formData = new FormData(formModificar);
  console.log()
  try {
    const response = await fetch(`${apiUrl}/producto/${id}`, {
      method: 'PUT',
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