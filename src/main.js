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

let ancestors = (arr, pos)=> {
  let a = []
  for(let i=0; i<3; i++){
    a.push(loopArray(arr, i+pos-1))
  }
  return a
}

let ruleChecker = (anc, rule)=> {
  let a = 0
  if(anc[0]){
    a=a+4
  }if(anc[1]) {
    a=a+2
  }if(anc[2]){
    a=a+1
  }
  return rule[7-a]
}

let nextGen = (auto, rule)=> {
  if(rule===undefined) {
    auto = []
    auto.push(firstGen({isRandom: false, length: 20}))
  } else {
    auto = auto[auto.length-1].map((x,i,arr)=> {
      return ruleChecker(
        ancestors(arr, i),
        rule
      )
    })
  }
  return auto
}

const Automaton = {
  firstGen: firstGen,
  ruleTranslator: ruleTranslator,
  loopArray: loopArray,
  ancestors: ancestors,
  ruleChecker: ruleChecker,
  nextGen: nextGen,
}

let automaton = (settings)=> {
  let aut = Object.create(Automaton)
  aut.settings = settings
  aut.ruleArr = aut.ruleTranslator(aut.settings.ruleNumber)
  aut.feild = [aut.firstGen(aut.settings)]
  aut.next = ()=> {
    let feild = aut.feild
    aut.feild.push(aut.nextGen(aut.feild, aut.ruleArr))
  }
  return aut
}
