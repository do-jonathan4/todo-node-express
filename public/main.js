const form = document.querySelector("form")
const input = document.getElementById("item")
const list = document.getElementById("list")
let items = []

form.addEventListener('submit', postTask)
list.addEventListener('click', delTask)

window.onload = event => {
  fetch('/getItems')
    .then(res => res.json())
    .then(res => items = res)
    .then(showTasks)
    .catch(err => console.log(err))
};
function postTask(event) {
  if (input.value === '') return
  event.preventDefault()
  fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: input.value})
  })
    .then(res => res.json())
    .catch(err => console.log(err))

  addTask(input.value)
  form.reset()
}
function delTask(event) {
  event.preventDefault()
  const index = items.indexOf(event.target.textContent)
  fetch('/'+index, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  removeTask(index)
}

function showTasks() {
  items.forEach(x => {
    list.innerHTML += `<p class="bg-secondary rounded p-2 text-white">${x}</p>`
  })
}
function addTask(item) {
  items.push(item)
  const p = document.createElement('p')
  p.className = 'bg-secondary rounded p-2 text-white'
  p.innerText = item
  list.appendChild(p)
}
function removeTask(i) {
  items.splice(i, 1)
  list.removeChild(list.childNodes[i])
}
