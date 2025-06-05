// Basic 1‑D cellular automaton renderer

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

function firstGen(length = 100, start = 'ONE') {
  let arr = Array(length).fill(0);
  if (start === 'ONE' || start === 0) {
    arr[Math.floor(arr.length / 2)] = 1;
  } else if (start === 'RANDOM' || start === 1) {
    arr = arr.map(() => Math.floor(Math.random() * 2));
  }
  return arr;
}

function parseBinArr(arr) {
  return arr[0] | (arr[1] << 1) | (arr[2] << 2);
}

function loopArrRef(n, length) {
  if (n < 0) {
    return loopArrRef(n + length, length);
  }
  return n % length;
}

function nextGen(prevGen, rule) {
  return prevGen
    .map((val, idx, arr) =>
      parseBinArr([
        arr[loopArrRef(idx + 1, arr.length)],
        val,
        arr[loopArrRef(idx - 1, arr.length)]
      ])
    )
    .map(i => (rule >>> i) & 1);
}

function drawAutoAlt(autoData, yToPull, heightToPull, yToPut) {
  const imageData = ctx.getImageData(0, yToPull, width, heightToPull);
  for (let i = 0; i < autoData.length; i++) {
    imageData.data[4 * i] = 255 - autoData[i] * 255;
    imageData.data[4 * i + 1] = 255 - autoData[i] * 255;
    imageData.data[4 * i + 2] = 255 - autoData[i] * 255;
    imageData.data[4 * i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, yToPut);
}

let timerId = null;
let time = 0;
let prevGen = firstGen(width, 'ONE');

function intervalContinuous(rule) {
  drawAutoAlt(prevGen, time % height, 1, time % height);
  prevGen = nextGen(prevGen, rule);
  time++;
}

function intervalScrolling(rule) {
  drawAutoAlt(prevGen, 0, height, 1);
  prevGen = nextGen(prevGen, rule);
  time++;
}

function startAutomaton() {
  const rule = parseInt(document.getElementById('rule').value, 10) || 0;
  const start = document.getElementById('start').value;
  const speed = parseInt(document.getElementById('speed').value, 10) || 50;
  const mode = document.getElementById('mode').value;

  if (timerId) {
    window.clearInterval(timerId);
  }
  time = 0;
  prevGen = firstGen(width, start);

  if (mode === 'CONTINUOUS') {
    timerId = window.setInterval(() => intervalContinuous(rule), speed);
  } else {
    timerId = window.setInterval(() => intervalScrolling(rule), speed);
  }
}

document.getElementById('startButton').addEventListener('click', startAutomaton);
