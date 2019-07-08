//// This program calculates and renders a 1D Celular Automaton.
//// each cell in the array is either (alive or dead) / (on or off) / (1 or 0)
//// its future depends on its neighbors, and the "rule".
//// it may be easier to understand the rule as a list what value to change to for
//// every possible combination of the cell and each of its neighbors
//// i.e. [0,0,0]=0, [0,0,1]=0, [0,1,0]=1, [0,1,1]=0... and so on
////

function arrayTo(n) {
  let arr = []
  for (i = 0; i < n; i++) {
    arr.push(i + 1)
  }
  return arr
}

function firstGen(length = 100, start = "ONE") {
  let arr = Array(length)
  arr.fill(0)
  if (start === "ONE" || start === 0) {
    arr[arr.length / 2] = 1
    return arr
  } else if (start === "RANDOM" || start === 1) {
    arr = arr.map(() => Math.floor(Math.random() * 2))
    return arr
  }
}
// console.log(firstGen(10))

// arr is 3 length array only containing ones or zeros
// the function returns this as an integer
function parseBinArr(arr) {
  return arr[0] | (arr[1] << 1) | (arr[2] << 2)
}
// console.log(parseBinArr([0,1,1]))

// Finds the correct array reference as if the array was a looping array
function loopArrRef(n, length) {
  if (n < 0) {
    return loopArrRef(n + length, length)
  }
  return n % length
}
// console.log(loopArrRef(-100,100))

// returns the next row/generation of the Automaton.
function nextGen(prevGen, rule) {
  return prevGen
    .map((i, n, arr) =>
      parseBinArr([
        arr[loopArrRef(n + 1, arr.length)],
        i,
        arr[loopArrRef(n - 1, arr.length)]
      ])
    )
    .map(i => (rule >>> i) & 1)
}

// console.log(nextGen(firstGen(8),30))

function multiGen(gens = 100, rule = 30, first = firstGen(100)) {
  auto = [first]
  for (i = 0; i < gens - 1; i++) {
    auto.push(nextGen(auto[auto.length - 1], rule))
  }
  return auto
}
// console.log(multiGen(10, 30, firstGen(10, 1)))

// -----------------------------
// -----------------------------
let c = canvas.getContext("2d")
let width = canvas.width
let height = canvas.height

function random(max) {
  return Math.floor(Math.random() * max)
}

function drawRandom() {
  let imageData = c.getImageData(0, 0, width, height)
  for (i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = random(255)
    imageData.data[i + 1] = random(255)
    imageData.data[i + 2] = random(255)
    imageData.data[i + 3] = 255
  }
  c.putImageData(imageData, 0, 0)
}
// drawRandom()
function drawAuto(autoData) {
  let imageData = c.getImageData(0, 0, width, height)
  for (i = 0; i < autoData.length; i++) {
    imageData.data[4 * i] = 255 - autoData[i] * 255
    imageData.data[4 * i + 1] = 255 - autoData[i] * 255
    imageData.data[4 * i + 2] = 255 - autoData[i] * 255
    imageData.data[4 * i + 3] = 255
  }
  c.putImageData(imageData, 0, 0)
}

// drawAuto(multiGen(height,110,firstGen(width,0)).flat())

// -----------------------------
// -----------------------------

// Makes an automaton,
// makes a function with three arguments which are the previous generation of the cell and its neighbors
// Replaces the nextGen function
function generateAutomatonFunction(rule) {
  return function(left, middle, right) {
    return (left << 2) | (middle << 1) | right
  }
}

function drawAutoAlt(autoData, yToPull, heightToPull, yToPut) {
  let imageData = c.getImageData(0, yToPull, width, heightToPull)
  for (i = 0; i < autoData.length; i++) {
    imageData.data[4 * i] = 255 - autoData[i] * 255
    imageData.data[4 * i + 1] = 255 - autoData[i] * 255
    imageData.data[4 * i + 2] = 255 - autoData[i] * 255
    imageData.data[4 * i + 3] = 255
  }
  c.putImageData(imageData, 0, yToPut)
}

let time = 0
let prevGen = firstGen(width, 0)

function intervalAutoContinuous() {
  drawAutoAlt(prevGen, time % height, 1, time % height)
  prevGen = nextGen(prevGen, 30)
  time++
}

function intervalAutoScrolling() {
  drawAutoAlt(prevGen, 0, height, 1)
  prevGen = nextGen(prevGen, 30)
  time++
}

// Uncomment to start continuous mode
// let interval = window.setInterval(intervalAutoContinuous, 50)

// Uncomment to start scrolling mode
let interval = window.setInterval(intervalAutoScrolling, 50)
