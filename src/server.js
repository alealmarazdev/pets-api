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

/* app.use((req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('authorization header not present')
    console.log('headers: ', authorization)
    const jwtDecoded = user.verifyJwt(authorization)
    console.log('jwt: ', jwtDecoded)
    next()
  } catch (error) {
    res.status(401)
    res.json({
      success: false,
      message: 'token required',
      error: 'authorization header required'
    })
  }
})
 */
app.use('/users', usersRouter)
app.use('/pets', petsRouter)

app.get('/', (request, response) => {
  response.json({
    success: true,
    message: 'pet api version 1'
  })
})

module.exports = {
  server: app,
  port
}
