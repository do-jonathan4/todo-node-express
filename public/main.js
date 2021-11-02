const form = document.getElementById("form")
const input = document.getElementById("item")
const list = document.getElementById("list")
let items = []

window.onload = event => {
  fetch('/getItems')
    .then(res => res.json())
    .then(res => {
      items = res.tasks
      console.log(items)
    })
    .catch(err => console.log(err))
};
