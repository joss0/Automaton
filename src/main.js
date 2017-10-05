
let width = window.innerWidth
let height = window.innerHeight

let rule30 = automaton(settings(30))
rule30.generate(99)
console.log(rule30.feild)
