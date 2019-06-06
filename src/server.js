// dependencis
const express = require('express')

// own package
// const routes = requiere('./routes')
const user = require('./usecases/user')
const pet = require('./usecases/pet')

// app const var
var app = express()
const port = 8080

app.use(express.json())

app.get('/hola', (request, response) => {
  response.json({
    message: 'hola desde el servidor'
  })
})

app.post('/users', (req, res) => {
  try {
    const newUserData = req.body
    const newUser = user.signUp(newUserData)
    res.json({
      success: true,
      message: 'User createds successfully',
      payload: {
        user: newUser
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'cannot create user',
      error: error.message
    })
  }
})

app.post('/pets', (req, res) => {
  try {
    const newPetData = req.body
    const newPet = pet.registration(newPetData)
    res.json({
      success: true,
      message: 'pet createds successfully',
      payload: {
        user: newPet
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'cannot create pet',
      error: error.message
    })
  }
})

module.exports = {
  server: app,
  port
}
