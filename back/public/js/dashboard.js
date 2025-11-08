import { serverUrl } from './variables.js';
const tableBody = document.getElementById('table-body');
const arrayBtnModificar = tableBody.getElementsByClassName('modificar');
const arrayBtnBajar = tableBody.getElementsByClassName('bajar');
const arrayBtnEliminar = tableBody.getElementsByClassName('eliminar');

for (let boton of arrayBtnModificar) {
  document.getElementById(boton.id).onclick = () => window.location.href = '/producto/modificar';
}

for (let boton of arrayBtnBajar) {
  document.getElementById(boton.id).onclick = async () => {
    try {
      const id = boton.id.split("-")[2];
      console.log(id);
      const response = await fetch(`${serverUrl}/producto/activo/${id}`, {
        method: "PUT"
      });
      if (response.ok) {
        console.log(`Producto Nº ${id} dado de baja correctamente`);
        location.reload();
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
}

for (let boton of arrayBtnEliminar) {
  document.getElementById(boton.id).onclick = async () => {
    try {
      const id = boton.id.split("-")[2];
      const response = await fetch(`${serverUrl}/producto/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        location.reload();
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
}