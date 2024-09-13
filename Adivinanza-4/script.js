// Variable para almacenar las aristas ocultas
let hiddenEdges = 0;

// Seleccionar todas las aristas
const edges = document.querySelectorAll('.edge');

// Evento de clic para ocultar y mostrar las aristas
edges.forEach(edge => {
  edge.addEventListener('click', () => {
    // Si la arista no está oculta, ocultarla
    if (!edge.classList.contains('hidden')) {
      edge.classList.add('hidden');
      hiddenEdges++;

      // Si se ocultan 5 aristas, comprobar si hay 3 cuadrados formados
      if (hiddenEdges === 5) {

        if (!checkIfThreeSquares()) {
          // Si no hay 3 cuadrados, resetear la tabla
          resetGrid();
        }else{
          clearInterval(intervalId);
          const endTime = new Date();
          const timeTaken = Math.round((endTime - startTime) / 1000);

          alert('Felicidades. Completastes la adivinanza \n' + `Tiempo tomado: ${timeTaken} segundos.` );
        }
      }
    }
  });
});

// Lógica para verificar si hay 3 cuadrados formados con las aristas ocultas
function checkIfThreeSquares() {
  // Obtener el estado actual de todas las aristas ocultas
  const hiddenEdgesArray = Array.from(document.querySelectorAll('.edge.hidden')).map(edge => edge.dataset.edge);
  
  // Las configuraciones válidas para formar 3 cuadrados
  const validConfiguration1 = ['1', '3', '8', '10', '16'];   // Primera opción correcta
  const validConfiguration2 = ['2', '7', '9', '11', '17'];   // Segunda opción correcta

  // Verificar si la lista de aristas ocultas coincide con una de las configuraciones válidas
  const hiddenSet = new Set(hiddenEdgesArray);
  
  const config1Matched = validConfiguration1.every(edge => hiddenSet.has(edge));
  const config2Matched = validConfiguration2.every(edge => hiddenSet.has(edge));

  return config1Matched || config2Matched;
}

// Función para resetear la tabla si no se forman 3 cuadrados
function resetGrid() {
  edges.forEach(edge => {
    edge.classList.remove('hidden');
  });
  hiddenEdges = 0;
  alert('No lograste formar 3 cuadrados. La tabla se ha reiniciado.');
}

let startTime, intervalId;

document.getElementById('mostrarBtn').addEventListener('click', () => {
    document.getElementById('mostrarBtn').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    startTime = new Date();
    intervalId = setInterval(updateTime, 1000);
});

function updateTime() {
    const now = new Date();
    const timeTaken = Math.round((now - startTime) / 1000);
}

function goBack() {
  window.location.href = "../index.html";
}