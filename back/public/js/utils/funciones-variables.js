const frontUrl = "http://localhost:5500"; // Según el puerto de Live Server
const apiUrl = "http://localhost:3000"; // Según el puerto de Express
const categoriaA = 'Farol';
const categoriaB = 'Plafon';
const response = await fetch(apiUrl + '/producto/all');
const productos = await response.json();

function cambiarTema() {
  let tema = localStorage.getItem('tema');
  if (tema === null || tema === 'claro') {
    localStorage.setItem('tema', 'oscuro');
    document.documentElement.classList.add('oscuro');
  } else if (tema === 'oscuro') {
    localStorage.setItem('tema', 'claro');
    document.documentElement.classList.remove('oscuro');
  } else {
    console.log('Algo salió mal');
  }
}

function mostrarProductos(categoria, sectionProductos) {
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
        };
      }
      
      const arrayBtnBajar = tableBody.getElementsByClassName('bajar');
      for (let boton of arrayBtnBajar) {
        boton.onclick = async () => {
          confirmarBaja().then(async (result) => {
            if (result.isConfirmed) {
              try {
                const id = boton.id.split("-")[2];
                const response = await fetch(`${apiUrl}/producto/activo/${id}`, {
                  method: "PUT"
                });
                if (response.ok) {
                  const { modificado } = await response.json();
                  const tdActivo = document.getElementById(`activo-${id}`);
                  tdActivo.textContent = modificado.activo ? 'Activo' : 'Inactivo';
                  boton.textContent = modificado.activo ? 'Dar de baja' : 'Dar de alta';
                  Toastify({
                    text: `¡Producto dado de ${modificado.activo ? 'alta' : 'baja'} exitosamente!`,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#0e87beff",
                    },
                    onClick: function(){}
                  }).showToast();
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
                  document.getElementById(`tr-producto-${id}`).remove();
                  Toastify({
                    text: `¡Producto eliminado exitosamente!`,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#0e87beff",
                    },
                    onClick: function(){}
                  }).showToast();
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
  <td id="activo-${producto.id}">${producto.activo ? 'Activo' : 'Inactivo'}</td>
  <td><button class="modificar" id="btn-modificar-${producto.id}">Modificar</button></td>
  ${
    producto.activo
      ? `<td><button class="bajar" id="btn-bajar-${producto.id}">Dar de baja</button></td>`
      : `<td><button class="bajar" id="btn-bajar-${producto.id}">Dar de alta</button></td>`
  }
  <td><button class="eliminar" id="btn-eliminar-${producto.id}">Eliminar de la DB</button></td>
  `;
  return tr;
}

const confirmarBaja = () =>
  Swal.fire({
    title: '¿Está seguro que desea cambiar el estado del producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  });

const confirmarEliminacion = () => Swal.fire({
  title: '¿Está seguro que desea eliminar el producto de la base de datos?',
  text: '¡Esta acción no se puede revertir!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si',
  cancelButtonText: 'No',
});

async function agregarProducto(formAgregar) {
  const formData = new FormData(formAgregar);

  try {
    const response = await fetch(`${apiUrl}/producto`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.log('Error: faltan datos');
      await Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Faltan datos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Producto agregado exitosamente!',
        showConfirmButton: false,
        timer: 1500,
      });
      location.assign('/administrator/dashboard');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

async function modificarProducto(formModificar) {
  const id = document.getElementById('productoId').value;
  const formData = new FormData(formModificar);
  try {
    const response = await fetch(`${apiUrl}/producto/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      console.log('Error: faltan datos');
    } else {
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Producto modificado exitosamente!',
        showConfirmButton: false,
        timer: 1500,
      });
      location.assign('/administrator/dashboard');
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

export {
  frontUrl,
  apiUrl,
  categoriaA,
  categoriaB,
  productos,
  cambiarTema,
  mostrarProductos,
  eliminarElementos,
  crearCard,
  confirmarBaja,
  confirmarEliminacion,
  agregarProducto,
  modificarProducto,
};