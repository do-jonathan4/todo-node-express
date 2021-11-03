const form = document.getElementById("form")
const input = document.getElementById("item")
const list = document.getElementById("list")
let items = []

form.addEventListener('submit', addTask)

window.onload = event => {
  fetch('/getItems')
    .then(res => res.json())
    .then(res => items = res)
    .then(showTasks)
    .catch(err => console.log(err))
};

function addTask(event) {
  event.preventDefault()
  fetch('/addItem', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: input.value})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  appendTask(input.value)
  form.reset()
}

function showTasks() {
  items.forEach(x => {
    list.innerHTML += `<li>${x}</li>`
  })
}
function appendTask(item) {
  items.push(item)
  const li = document.createElement('li')
  li.innerText = item
  list.append(li)
}
