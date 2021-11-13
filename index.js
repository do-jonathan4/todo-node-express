require('dotenv').config()

const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require("body-parser")

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const data = ['hello', 'world']

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.get('/getItems', (req, res) => {
  res.json(data)
})

app.post('/', (req, res) => {
  data.push(req.body.text)
})
app.delete('/:id', (req, res) => {
  const i = req.params.id
  data.splice(i, 1)
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
