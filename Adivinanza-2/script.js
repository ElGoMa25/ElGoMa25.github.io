// Variables de peso
const maxWeight = 80;
const weights = {
  man: 80,
  child1: 40,
  child2: 40
};

// Variables de selección
let currentWeight = 0;
let passengers = [];
let crossedPassengers = [];
let isRaftOnRightSide = false; // Estado de la balsa (false: izquierda, true: derecha)

// Elementos del DOM
const message = document.getElementById('message');
const raft = document.querySelector('.raft');
const characters = {
  man: document.getElementById('man'),
  child1: document.getElementById('child1'),
  child2: document.getElementById('child2')
};

// Función para añadir o quitar pasajeros
function togglePassenger(passenger, weight) {
  if (!isRaftOnRightSide && crossedPassengers.includes(passenger)) {
    message.innerText = 'La balsa está en el lado izquierdo, los personajes del lado derecho no pueden subir.';
    return;
  } else if (isRaftOnRightSide && !crossedPassengers.includes(passenger)) {
    message.innerText = 'La balsa está en el lado derecho, los personajes del lado izquierdo no pueden subir.';
    return;
  }

  const index = passengers.indexOf(passenger);
  if (index === -1) {
    if (currentWeight + weight <= maxWeight) {
      passengers.push(passenger);
      currentWeight += weight;
      moveToRaft(passenger); // Mueve el personaje a la balsa
    } else {
      message.innerText = `El peso total supera los ${maxWeight} kg. No puedes añadir más pasajeros.`;
      return;
    }
  } else {
    passengers.splice(index, 1);
    currentWeight -= weight;
    removeFromRaft(passenger); // Quita el personaje de la balsa
  }
  message.innerText = `Pasajeros actuales: ${passengers.join(', ')}. Peso total: ${currentWeight} kg.`;
}

function moveToRaft(passenger) {
  const characterElement = characters[passenger];
  characterElement.classList.add('in-raft'); // Cambia el estilo para estar en la balsa
  raft.appendChild(characterElement); // Añade el personaje a la balsa

  // Ajustamos las posiciones para que se ubiquen uno al lado del otro
  const passengerIndex = passengers.indexOf(passenger);
  characterElement.style.left = `${passengerIndex * 50}px`; // Posición horizontal en la balsa (separación)
}

// Función para quitar un personaje de la balsa
function removeFromRaft(passenger) {
  const characterElement = characters[passenger];
  characterElement.classList.remove('in-raft');
  document.querySelector('.characters').appendChild(characterElement); // Devuelve el personaje a su lugar original
}

// Función para cruzar el río
document.getElementById('cross').addEventListener('click', function() {
  if (currentWeight > 0) {
    message.innerText = '';
    raft.style.left = 'calc(100% - 100px)'; // Mueve la balsa a la derecha del río
    isRaftOnRightSide = true; // Cambia el estado de la balsa a la derecha inmediatamente

    setTimeout(() => {
      moveToRightSide(); // Mueve los personajes al otro lado después de cruzar
      checkCompletion();  // Verificar si el desafío se ha completado
    }, 5000);
  } else {
    message.innerText = 'No hay pasajeros en la balsa. Selecciona al menos un personaje.';
  }
});

// Función para cruzar de vuelta (de derecha a izquierda)
document.getElementById('crossBack').addEventListener('click', function() {
  if (currentWeight > 0 && isRaftOnRightSide) {
    message.innerText = '';
    raft.style.left = '0'; // Mueve la balsa de regreso a la izquierda
    isRaftOnRightSide = false; // Cambia el estado de la balsa a la izquierda inmediatamente

    setTimeout(() => {
      moveToLeftSide(); // Mueve los personajes de vuelta después de cruzar de regreso
    }, 5000);
  } else if (isRaftOnRightSide) {
    message.innerText = 'Debes seleccionar al menos un pasajero para cruzar de regreso.';
  } else {
    message.innerText = 'La balsa ya está de este lado.';
  }
});

// Función para mover los personajes al lado derecho del río después de cruzar
function moveToRightSide() {
  passengers.forEach(passenger => {
    const characterElement = characters[passenger];
    characterElement.classList.remove('in-raft');
    characterElement.classList.add('crossed'); // Añade la clase para estar al otro lado
    document.body.appendChild(characterElement); // Mueve el personaje al otro lado
    crossedPassengers.push(passenger); // Se marca que cruzó
  });
  passengers = [];
  currentWeight = 0;
  message.innerText = 'Personajes cruzaron el río.';
}

// Función para mover los personajes al lado izquierdo del río después de regresar
function moveToLeftSide() {
  passengers.forEach(passenger => {
    const characterElement = characters[passenger];
    characterElement.classList.remove('in-raft');
    characterElement.classList.remove('crossed'); // Quita la clase de estar al otro lado
    document.querySelector('.characters').appendChild(characterElement); // Mueve el personaje al lado izquierdo
    crossedPassengers = crossedPassengers.filter(p => p !== passenger); // Se quita de los que cruzaron
  });
  passengers = [];
  currentWeight = 0;
  message.innerText = 'Personajes regresaron al lado izquierdo.';
}

// Verifica si todos los personajes cruzaron el río
function checkCompletion() {
  if (crossedPassengers.length === 3) {
    alert("¡Felicidades! Todos los personajes han cruzado el río.");
    // Mostrar botón de reinicio
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reiniciar';
    resetButton.style.marginTop = '20px';
    resetButton.addEventListener('click', () => {
      location.reload(); // Recargar la página para reiniciar el juego
    });
    document.body.appendChild(resetButton);
  }
}

// Botones para subir a la balsa
document.getElementById('manButton').addEventListener('click', () => {
  togglePassenger('man', weights.man);
});
document.getElementById('child1Button').addEventListener('click', () => {
  togglePassenger('child1', weights.child1);
});
document.getElementById('child2Button').addEventListener('click', () => {
  togglePassenger('child2', weights.child2);
});

function goBack() {
  window.location.href = "../index.html";
}