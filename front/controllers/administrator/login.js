const btnIngresar = document.getElementById("btn-ingresar");

btnIngresar.addEventListener("click", () => {
  const mail = document.getElementById("input-mail").value;
  const pass = document.getElementById("input-clave").value;
  const mensaje = document.getElementById("p-mensaje");
  if (mail.length === 0 || pass.length === 0) {
    mensaje.innerText = "Por favor, ingrese todos los datos...";
  } else {
    mensaje.innerText = "";
    window.location.replace("./dashboard.html");
  }
});
