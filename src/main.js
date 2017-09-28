let width = window.innerWidth
let height = window.innerHeight


console.log('refreshed page')

// page controlls
function refresh() {
  // TODO: refresh automaton
  console.log('TODO: refresh automaton')
}
let settings = {random: false, length: 100}

let firstGen = (settings)=>{
  let r = settings.random
  let l = settings.length
  let a = []
  if(r){
    // populate firstGen randomly
    for(i = 0; i<l; i++){
      a.push(Math.floor(1&Math.random()*2))
    }
    return a
  } else {
    // populate firstGen with all cells empty except the middle cell
    for(i = 0; i<l; i++) {
      a.push(i===l>>>1?1:0)
    }
    return a
  }
}

let ruleTranslator = r=> {
  let a = []
  for(let i=0; i<8; i++) {
    a.push(r >> i & 1)
  }
  return a
}

let loopArray = (arr, pos)=> {
  let l = arr.length
  return pos in arr?arr[pos]:(pos<l?arr[l+pos]:arr[pos%l])
}

// TODO: nextGen
