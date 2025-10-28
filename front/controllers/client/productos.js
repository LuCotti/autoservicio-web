const btnTema = document.getElementById("btn-tema");
const btnLlantas = document.getElementById("btn-llantas");
const btnNeumaticos = document.getElementById("btn-neumaticos");
const btnPaginaAnterior = document.getElementById("btn-pagina-anterior");
const btnPaginaSiguiente = document.getElementById("btn-pagina-siguiente");
const sectionProductos = document.getElementById("section-productos");

let productos = [
  {
    id: 1,
    nombre: "PRUEBA 01",
    precio: 111,
    imagen: "../../images/faroles/PRUEBA-01.webp",
    categoria: "Faroles",
    activo: true,
  },
  {
    id: 2,
    nombre: "PRUEBA 02",
    precio: 222,
    imagen: "../../images/faroles/PRUEBA-02.webp",
    categoria: "Faroles",
    activo: true,
  },
  {
    id: 3,
    nombre: "PRUEBA 03",
    precio: 333,
    imagen: "../../images/faroles/PRUEBA-03.webp",
    categoria: "Faroles",
    activo: true,
  },
  {
    id: 4,
    nombre: "PRUEBA 04",
    precio: 444,
    imagen: "../../images/faroles/PRUEBA-04.webp",
    categoria: "Faroles",
    activo: true,
  },
  {
    id: 5,
    nombre: "PRUEBA 05",
    precio: 555,
    imagen: "../../images/faroles/PRUEBA-05.webp",
    categoria: "Faroles",
    activo: true,
  },
  {
    id: 6,
    nombre: "PRUEBA 06",
    precio: 666,
    imagen: "../../images/plafones/PRUEBA-06.webp",
    categoria: "Plafones",
    activo: true,
  },
  {
    id: 7,
    nombre: "PRUEBA 07",
    precio: 777,
    imagen: "../../images/plafones/PRUEBA-07.webp",
    categoria: "Plafones",
    activo: true,
  },
  {
    id: 8,
    nombre: "PRUEBA 08",
    precio: 888,
    imagen: "../../images/plafones/PRUEBA-08.webp",
    categoria: "Plafones",
    activo: true,
  },
  {
    id: 9,
    nombre: "PRUEBA 09",
    precio: 999,
    imagen: "../../images/plafones/PRUEBA-09.webp",
    categoria: "Plafones",
    activo: true,
  },
  {
    id: 10,
    nombre: "PRUEBA 10",
    precio: 101010,
    imagen: "../../images/plafones/PRUEBA-10.webp",
    categoria: "Plafones",
    activo: true,
  },
];

