import { serverUrl } from './variables.js';
const inputNombre = document.getElementById('input-nombre');
const inputPrecio = document.getElementById('input-precio');
const inputImagen = document.getElementById('input-imagen');
const inputCategoria = document.getElementById('input-categoria');
const btnAgregar = document.getElementById('btn-agregar');

btnAgregar.onclick = agregarProducto;

async function agregarProducto() {
  const nombre = inputNombre.value || undefined;
  const precio = inputPrecio.value || undefined;
  const imagen = inputImagen.value || undefined;
  const categoria = inputCategoria.value || undefined;
  const body = {
    nombre: nombre,
    precio: precio,
    imagen: imagen,
    categoria: categoria
  };

  try {
    const response = await fetch(`${serverUrl}/producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.log('Error: faltan datos');
    } else {
      location.href = '/administrator/dashboard';
    }
  } catch(error) {
    console.log('Error:', error);
  }
}