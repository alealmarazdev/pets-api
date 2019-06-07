// dependencis
const express = require('express')

const usersRouter = require('./routes/users')
const petsRouter = require('./routes/pets')
// own package
// const routes = requiere('./routes')
/* const user = require('./usecases/user') */
/* const pet = require('./usecases/pet') */

// app const var

var app = express()
const port = 8080

app.use(express.json())
app.use('/users', usersRouter)
app.use('/pets', petsRouter)

app.get('/', (request, response) => {
  response.json({
    success: true,
    message: 'pet api version 1'
  })
})

/* app.post('/pets', (req, res) => {
  try {
    const newPetData = req.body
    const newPet = pet.registration(newPetData)
    res.json({
      success: true,
      message: 'pet created successfully',
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
}) */

module.exports = {
  server: app,
  port
}
