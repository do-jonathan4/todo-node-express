require('dotenv').config()

const express = require('express')
const app = express()
const path = require("path");
// const bodyParser = require("body-parser")

app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
