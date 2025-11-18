import { obtenerTema, cambiarTema, apiUrl } from './funciones-variables.js';
const body = document.getElementsByTagName('body')[0];
const btnTema = document.getElementById('btn-tema');
const btnCancelar = document.getElementById("btn-cancelar");
const formAgregar = document.getElementById('form-agregar');
let tema = obtenerTema();
if (tema === 'oscuro') body.classList.add('oscuro');

btnTema.onclick = cambiarTema;

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
      await Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Faltan datos",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Producto agregado exitosamente!",
        showConfirmButton: false,
        timer: 1500
      });
      location.assign('/administrator/dashboard');
    }
  } catch(error) {
    console.log('Error:', error);
  }
}