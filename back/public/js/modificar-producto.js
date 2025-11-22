import { cambiarTema, apiUrl } from "./utils/funciones-variables.js";
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById('btn-cancelar');
const formModificar = document.getElementById('form-modificar');

btnTema.onclick = cambiarTema;

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
  try {
    const response = await fetch(`${apiUrl}/producto/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      console.log('Error: faltan datos');
    } else {
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Producto modificado exitosamente!",
        showConfirmButton: false,
        timer: 1500
      });
      location.assign('/administrator/dashboard');
    }
  } catch(error) {
    console.log('Error:', error);
  }
}