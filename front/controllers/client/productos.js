const btnTema = document.getElementById("btn-tema");
const btnFaroles = document.getElementById("btn-faroles");
const btnPlafones = document.getElementById("btn-plafones");
const btnPaginaAnterior = document.getElementById("btn-pagina-anterior");
const btnPaginaSiguiente = document.getElementById("btn-pagina-siguiente");
const sectionProductos = document.getElementById("section-productos");
const categoriaA = "Faroles";
const categoriaB = "Plafones";

const productos = [
  {
    id: 1,
    nombre: "PRUEBA 01",
    precio: 111,
    imagen: "../../images/faroles/PRUEBA-01.webp",
    categoria: categoriaA,
    activo: true,
  },
  {
    id: 2,
    nombre: "PRUEBA 02",
    precio: 222,
    imagen: "../../images/faroles/PRUEBA-02.webp",
    categoria: categoriaA,
    activo: true,
  },
  {
    id: 3,
    nombre: "PRUEBA 03",
    precio: 333,
    imagen: "../../images/faroles/PRUEBA-03.webp",
    categoria: categoriaA,
    activo: true,
  },
  {
    id: 4,
    nombre: "PRUEBA 04",
    precio: 444,
    imagen: "../../images/faroles/PRUEBA-04.webp",
    categoria: categoriaA,
    activo: true,
  },
  {
    id: 5,
    nombre: "PRUEBA 05",
    precio: 555,
    imagen: "../../images/faroles/PRUEBA-05.webp",
    categoria: categoriaA,
    activo: true,
  },
  {
    id: 6,
    nombre: "PRUEBA 06",
    precio: 666,
    imagen: "../../images/plafones/PRUEBA-06.webp",
    categoria: categoriaB,
    activo: true,
  },
  {
    id: 7,
    nombre: "PRUEBA 07",
    precio: 777,
    imagen: "../../images/plafones/PRUEBA-07.webp",
    categoria: categoriaB,
    activo: true,
  },
  {
    id: 8,
    nombre: "PRUEBA 08",
    precio: 888,
    imagen: "../../images/plafones/PRUEBA-08.webp",
    categoria: categoriaB,
    activo: true,
  },
  {
    id: 9,
    nombre: "PRUEBA 09",
    precio: 999,
    imagen: "../../images/plafones/PRUEBA-09.webp",
    categoria: categoriaB,
    activo: true,
  },
  {
    id: 10,
    nombre: "PRUEBA 10",
    precio: 101010,
    imagen: "../../images/plafones/PRUEBA-10.webp",
    categoria: categoriaB,
    activo: true,
  },
];



btnFaroles.addEventListener("click", () => {
  mostrarProductos(categoriaA);
});

btnPlafones.addEventListener("click", () => {
  mostrarProductos(categoriaB);
});



function mostrarProductos(categoria) {
  eliminarElementos(sectionProductos);
  for (let p of productos) {
    if (categoria === p.categoria) {
      const div = crearCard(p);
      sectionProductos.appendChild(div);

      if (estaGuardado(p.id)) {
        const btnQuitar = document.getElementById(`btn-quitar-${p.id}`);
        btnQuitar.addEventListener("click", () => {
          quitarProducto(p);
          window.location.reload();
        });
      } else {
        const btnAgregar = document.getElementById(`btn-agregar-${p.id}`);
        btnAgregar.addEventListener("click", () => {
          guardarProducto(p);
          window.location.reload();
        });
      }
    } else {
      continue;
    }
  }
}

function crearCard(producto) {
  const div = document.createElement("div");
  div.id = `div-producto-${producto.id}`;
  div.innerHTML = `
  <img src="${producto.imagen}">
  <p>Producto Nº: ${producto.id}</p>
  <p>Nombre: ${producto.nombre}</p>
  <p>Precio: ${producto.precio}</p>
  ${estaGuardado(producto.id) ? `<button id="btn-quitar-${producto.id}">Quitar del carrito</button>` : `<button id="btn-agregar-${producto.id}">Agregar al carrito</button>`}
  `;
  return div;
}

function eliminarElementos(contenedor) {
  while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
}

function traerGuardados() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProducto(nuevoProducto) {
  let productos = traerGuardados();
  productos.push(nuevoProducto);
  localStorage.setItem("productos", JSON.stringify(productos));
}

function estaGuardado(id) {
  const productos = traerGuardados();
  for (let p of productos) {
    if (id === p.id) return true;
  }
  return false;
}

function quitarProducto(producto) {
  let productos = traerGuardados();
  const index = obtenerPosicion(producto);
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
}

function obtenerPosicion(producto) {
  const productos = traerGuardados();
  let index = 0;
  for (let p of productos) {
    if (p.id === producto.id) break;
    index++;
  }
  return index;
}