const btnRef = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

btnRef.start.addEventListener('click', startGenerateColors);
btnRef.stop.addEventListener('click', stopGeneratoColors);

let randomId;

function startGenerateColors(){
    btnRef.start.disabled = !(btnRef.stop.disabled = false);
    randomId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopGeneratoColors(){
    btnRef.stop.disabled = !(btnRef.start.disabled = false);
    clearInterval(randomId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
