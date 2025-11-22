const frontUrl = "http://localhost:5500"; // Según el puerto de Live Server
const apiUrl = "http://localhost:3000"; // Según el puerto de Express

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

export { frontUrl, apiUrl, cambiarTema };