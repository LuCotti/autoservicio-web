const inputNombre = document.getElementById("inputNombre");
const btnIngresar = document.getElementById("btnIngresar");
const mensaje = document.getElementById("mensaje");

btnIngresar.onclick = ingresar;

function ingresar() {
  const nombre = inputNombre.value;
  if (nombre.length === 0) {
    mensaje.innerText = "Por favor, ingrese su nombre...";
  } else {
    mensaje.innerText = "";
    window.location.replace("../views/productos.html");
  }
}