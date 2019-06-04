// dependencis
const express = require('express')

// own package
// const routes = requiere('./routes')

// app const var
var app = express()
const port = 8080

app.get('/hola', (request, response) => {
  response.json({
    message: 'hellow word'
  })
})

module.exports = {
  server: app,
  port
}
