let width = window.innerWidth
let height = window.innerHeight


console.log('refreshed page')

// page controlls
function refresh() {
  // TODO: refresh automaton
  console.log('TODO: refresh automaton')
}

// TODO: firstGen


let ruleTranslator = r=> {
  let a = []
  for(let i=0; i<8; i++) {
    a.push(r >> i & 1)
  }
  return a
}
// TODO: loopArr

// TODO: nextGen
