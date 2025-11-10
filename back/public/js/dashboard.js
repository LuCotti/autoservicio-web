import { serverUrl } from './variables.js';
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const tableBody = document.getElementById('table-body');

btnAgregarProducto.onclick = () => {
  location.assign('/producto/alta');
};

btnCerrarSesion.onclick = () => {
  location.replace('/administrator');
};

if (tableBody) {
  const arrayBtnModificar = tableBody.getElementsByClassName('modificar');
  for (let boton of arrayBtnModificar) {
    document.getElementById(boton.id).onclick = () => {
      const id = boton.id.split('-')[2];
      localStorage.setItem('id-modificar', id);
      location.assign('/producto/modificar');
    };
  }

  const arrayBtnBajar = tableBody.getElementsByClassName('bajar');
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

  const arrayBtnEliminar = tableBody.getElementsByClassName('eliminar');
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
}