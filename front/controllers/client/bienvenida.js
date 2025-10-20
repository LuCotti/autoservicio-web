const inputNombre = document.getElementById("inputNombre");
const btnIngresar = document.getElementById("ingresar");
const mensaje = document.getElementById("mensaje");
const btnAdministrador = document.getElementById("administrador");

btnIngresar.onclick = ingresar;
btnAdministrador.onclick = () => {
  window.location.replace("../administrator/login.html");
}

function ingresar() {
  const nombre = inputNombre.value;
  if (nombre.length === 0) {
    mensaje.innerText = "Por favor, ingrese su nombre...";
  } else {
    mensaje.innerText = "";
    window.location.replace("./productos.html");
  }
}