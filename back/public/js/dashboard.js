const tableBody = document.getElementById('table-body');
const arrayBtnModificar = tableBody.getElementsByClassName('modificar');
const arrayBtnBajar = tableBody.getElementsByClassName('bajar');

for (let boton of arrayBtnModificar) {
  document.getElementById(boton.id).onclick = () => window.location.href = '/producto/modificar';
}

for (let boton of arrayBtnBajar) {
  document.getElementById(boton.id).onclick = async () => {
    try {
      const id = boton.id.split("-")[2];
      console.log(id);
      const response = await fetch(`http://localhost:3000/producto/activo/${id}`, {
        method: "PUT"
      });
      if (response.ok) {
        console.log(`Producto Nº ${id} dado de baja correctamente`);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
}