
function settings(rule, length, isRandom) {
  let settingsObject = {rule:30, length: 100, isRandom: false}
  if(rule) settingsObject.rule = rule
  if(length) settingsObject.length = length
  if(isRandom) settingsObject.isRandom = isRandom
  return settingsObject
}

let firstGen = (settings)=> {
  let a=[]
  if(settings.isRandom) {
    // populate firstGen randomly
    for(i=0; i < settings.length; i++){
      a.push(Math.floor(1&Math.random()*2))
    }
    return a
  } else {
    // populate firstGen with all cells empty except the middle cell
    for(i=0; i < settings.length; i++) {
      a.push(i === settings.length>>1?1:0)
    }
    return a
  }
}

let ruleTranslator = (rule)=> {
  let a = []
  for(let i=0; i<8; i++) {
    a.push(rule>>7-i & 1)
  }
  return a
}

let loopArr = (len, pos)=> {
  if(pos >= 0 && pos < len) {
    return pos
  } else if(pos < 0) {
    while(pos < 0) {
      pos+=len
    }
    return pos
  } else {
    return pos%len
  }
}

let ancestors = (arr, pos)=> {
  let a = []
  for(let i=0; i<3; i++){
    a.push(arr[loopArr(arr.length, i+pos-1)])
  }
  return a
}

let ruleChecker = (anc, rule)=> {
  let a = 0
  if(anc[0]) {
    a=a+4
  }if(anc[1]) {
    a=a+2
  }if(anc[2]) {
    a=a+1
  }
  return rule[7-a]
}

let nextGen = (auto, rule)=> {
  auto = auto[auto.length-1].map((x,i,arr)=> {
    return ruleChecker(ancestors(arr, i),rule)
  })
  return auto
}

const Automaton = {
  firstGen: firstGen,
  ruleTranslator: ruleTranslator,
  loopArr: loopArr,
  ancestors: ancestors,
  ruleChecker: ruleChecker,
  nextGen: nextGen,
}

let automaton = (settings)=> {
  let aut = Object.create(Automaton)
  aut.settings = settings
  aut.ruleArr = aut.ruleTranslator(aut.settings.rule)
  aut.feild = [aut.firstGen(aut.settings)]
  aut.next = ()=> {
    aut.feild.push(aut.nextGen(aut.feild, aut.ruleArr))
  }
  aut.generate = (length)=> {
    for(i=0; i<length; i++) {
      aut.next()
    }
  }
  return aut
}

let rule30 = automaton(settings(30,30))
rule30.generate(15)
console.log(rule30)
