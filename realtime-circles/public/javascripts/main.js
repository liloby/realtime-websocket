const circles = document.getElementById('circles');
let initials = '';

do {
  initials = prompt("Please enter your initials").toUpperCase();
} while (initials.length < 2 || initials.length > 3);

// Listen for clicks anywhere in the "section"
circles.addEventListener('click', function(evt) {
  addCircle(evt.clientX, evt.clientY, randomBetween(20,125), getRandomRGBA());
});

function addCircle(x, y, dia, rgba) {
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
  circles.innerHTML = '';
});

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return `rgba(${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(2, 10) / 10})`;
}
