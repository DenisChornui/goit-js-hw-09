const elements = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

let timer = null;

elements.startButton.addEventListener('click', handlerClickStart);
elements.stopButton.addEventListener('click', handlerClickStop);

function handlerClickStart() {
  timer = setInterval(() => {
    elements.startButton.disabled = true;
    elements.stopButton.disabled = false;
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handlerClickStop() {
  elements.startButton.disabled = false;
  elements.stopButton.disabled = true;

  clearInterval(timer);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
