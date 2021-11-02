require('dotenv').config()

const express = require('express')
const app = express()
const path = require("path");
const bodyParser = require("body-parser")
const todo = require("./task.json")
const fs = require("fs")

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.get('/getItems', (req, res) => {
  const data = JSON.parse(fs.readFileSync('task.json'))
  res.json(data)
})

app.post('/addtask', (req, res) => {
  let obj = req.body
  obj.id = Date.now()
  obj.checked = false
  todo.tasks.push(obj)
  console.log(todo.tasks)
  res.status(201)
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
