const btnTema = document.getElementById("btn-tema");
const inputNombre = document.getElementById("input-nombre");
const btnIngresar = document.getElementById("btn-ingresar");
const mensaje = document.getElementById("p-mensaje");
const btnAdministrador = document.getElementById("btn-administrador");
const loginURL = 'http://localhost:3000'

btnIngresar.onclick = ingresar;
btnAdministrador.onclick = () => {
  //console.log("asd");
  ingresar();
  //window.location.replace("../administrator/login.html");
}

async function ingresar() {
  const nombre = inputNombre.value;
  if (nombre.length === 0) {
    mensaje.innerText = "Por favor, ingrese su nombre...";
  } else {
    mensaje.innerText = "";
    localStorage.setItem("cliente", nombre);

    const  response = await fetch(loginURL + '/administrator')
    console.log(response);
    window.location.replace(response.url);
  }
}