
let width = window.innerWidth
let height = window.innerHeight

window.onload = load
reset.onclick = refresh

console.log('refreshed page')
function load() {
  document.body.appendChild(newElement('div', 'node'))
}

function newElement(tag, text) {
  tag = document.createElement(tag)
  tag.innerHTML = text
  return tag
}

let rule30 = automaton(settings(30))
rule30.generate(99)
