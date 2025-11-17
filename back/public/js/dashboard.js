import { obtenerTema, cambiarTema, apiUrl } from './funciones-variables.js';
const body = document.getElementsByTagName('body')[0];
const btnTema = document.getElementById('btn-tema');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const btnFaroles = document.getElementById('btn-faroles');
const btnPlafones = document.getElementById('btn-plafones');
const sectionProductos = document.getElementById('section-productos');
const categoriaA = "Farol";
const categoriaB = "Plafon";

let tema = obtenerTema();
if (tema === 'oscuro') body.classList.add('oscuro');

btnTema.onclick = cambiarTema;

btnAgregarProducto.onclick = () => {
  location.assign('/producto/alta');
};

btnCerrarSesion.onclick = () => {
  location.replace('/administrator');
};

btnFaroles.onclick = () => {
  mostrarProductos(categoriaA);
};

btnPlafones.onclick = () => {
  mostrarProductos(categoriaB);
};

const response = await fetch(apiUrl + '/producto/all');
const productos = await response.json();

function mostrarProductos(categoria) {
  eliminarElementos(sectionProductos);
  if (productos.length === 0) {
    sectionProductos.innerText = 'No hay productos en la base de datos';
  } else {
    sectionProductos.innerText = '';
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Imagen</th>
          <th>Categoría</th>
          <th>Activo</th>
          <th colspan="3">Acciones</th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    `;
    sectionProductos.appendChild(table);
    const tableBody = document.getElementById('table-body');
    for (let p of productos) {
      if (categoria === p.categoria) {
        const tr = crearCard(p);
        tableBody.appendChild(tr);

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
                const response = await fetch(`${apiUrl}/producto/activo/${id}`, {
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
                const response = await fetch(`${apiUrl}/producto/${id}`, {
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
      } else {
        continue;
      }
    }
  }
}

function eliminarElementos(contenedor) {
  while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
}

function crearCard(producto) {
  const tr = document.createElement('tr');
  tr.id = `tr-producto-${producto.id}`;
  tr.innerHTML = `
  <td class="id">${producto.id}</td>
  <td>${producto.nombre}</td>
  <td>${producto.precio}</td>
  <td><img src="../uploads/${producto.imagen}" alt="producto ${producto.id}" width="100"></td>
  <td>${producto.categoria}</td>
  <td>${producto.activo ? 'Activo' : 'Inactivo'}</td>
  <td><button class="modificar" id="btn-modificar-${producto.id}">Modificar</button></td>
  ${producto.activo ? `<td><button class="bajar" id="btn-bajar-${producto.id}">Dar de baja</button></td>` : `<td><button class="bajar" id="btn-bajar-${producto.id}">Dar de alta</button></td>`}
  <td><button class="eliminar" id="btn-eliminar-${producto.id}">Eliminar de la DB</button></td>
  `;
  return tr;
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