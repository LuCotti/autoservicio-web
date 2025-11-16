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
      //TODO: REDIRECCION A :
      window.location.href = `/producto/modificar/${id}`;
      //location.assign('/producto/modificar');
    };
  }
  
  const arrayBtnBajar = tableBody.getElementsByClassName('bajar');
  for (let boton of arrayBtnBajar) {
    document.getElementById(boton.id).onclick = async () => {
      confirmarBaja().then(async (result) => {
        if (result.isConfirmed) {
          try {
            const id = boton.id.split("-")[2];
            const response = await fetch(`${serverUrl}/producto/activo/${id}`, {
              method: "PUT"
            });
            if (response.ok) {
              location.reload();
            } else {
              console.log('Error');
            }
          } catch (error) {
            console.log('Error:', error);
          }
        }
      });
    };
  }

  const arrayBtnEliminar = tableBody.getElementsByClassName('eliminar');
  for (let boton of arrayBtnEliminar) {
    document.getElementById(boton.id).onclick = async () => {
      confirmarEliminacion().then(async (result) => {
        if (result.isConfirmed) {
          try {
            const id = boton.id.split("-")[2];
            const response = await fetch(`${serverUrl}/producto/${id}`, {
              method: "DELETE"
              //TODO: baja logica
            });
            if (response.ok) {
              location.reload();
            } else {
              console.log('Error');
            }
          } catch (error) {
            console.log('Error:', error);
          }
        }
      });
    };
  }
}

const confirmarBaja = () => Swal.fire({
  title: "¿Está seguro que desea cambiar el estado del producto?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si",
  cancelButtonText: "No",
});

const confirmarEliminacion = () => Swal.fire({
  title: "¿Está seguro que desea eliminar el producto de la base de datos?",
  text: "¡Esta acción no se puede revertir!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si",
  cancelButtonText: "No",
});