const sectionProductos = document.getElementById("productos");
const btnFinalizarCompra = document.getElementById("finalizar-compra");

btnFinalizarCompra.onclick = () => {
  console.log("Click!");
  window.location.replace("./ticket.html");
}