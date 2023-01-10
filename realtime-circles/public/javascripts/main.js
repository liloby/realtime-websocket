// get our connection to the socket.io server
const socket = io();
console.log(socket);

// listen to the server for the `add-circle` event
socket.on('add-circle', function(data) {
  console.log(data)
  addCircle(data)
})

socket.on('clear', function() {
  circles.innerHTML = '';
})

const circles = document.getElementById('circles');
let initials = '';

do {
  initials = prompt("Please enter your initials").toUpperCase();
} while (initials.length < 2 || initials.length > 3);

// Listen for clicks anywhere in the "section"
circles.addEventListener('click', function(evt) {
  socket.emit('add-circle', {
    initials: initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10, 100),
    rgba: getRandomRGBA()
  })
});

function addCircle({x, y, dia, rgba, initials}) {
  const el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.innerText = initials;
  circles.appendChild(el);
}

document.querySelector('button').addEventListener('click', function() {
  socket.emit('clear')
});

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return `rgba(${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(2, 10) / 10})`;
}
