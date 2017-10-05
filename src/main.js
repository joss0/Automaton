
let width = window.innerWidth
let height = window.innerHeight

let globalAuto = []

let newGlobalAuto = (...args)=> {
  globalAuto = automaton(settings(
    args[0] || 0,
    args[1] || 100,
    args[2] || false
  ))
  globalAuto.generate(
    args[3] ||
    args[1]*0.5 ||
    50
  )
  globalAuto.draw()
}

let onChange = ()=> {
  let hashArr = window.location.hash.split('/')
  if(hashArr[0] === '') hashArr = ['reverted to default', 30]
  let args = []
  for (let i = 1; i < hashArr.length; i++) {
    args.push(hashArr[i])
  }
  newGlobalAuto(args)
}

window.onhashchange = onChange

window.onload = onChange
