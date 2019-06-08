const express = require('express')

const user = require('../usecases/user')
const auth = require('../middlewares/auth')
const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
  try {
    const newUserData = req.body
    const newUser = await user.signUp(newUserData)
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

router.get('/', auth, async (req, res) => {
  try {
    const users = await user.getAll()
    res.json({
      success: true,
      message: 'User createds successfully',
      payload: {
        users: users
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'cannot get user',
      error: error.message
    })
  }
})

router.get('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const foundUser = await user.getById(id)
    response.json({
      success: true,
      message: 'user found',
      payload: {
        user: foundUser
      }
    })
  } catch (error) {
    console.error('error: ', error)
    response.status = 400
    response.json({
      success: false,
      message: 'user not found',
      error: error.message
    })
  }
})

router.delete('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const deleteUser = await user.deleteById(id)
    response.json({
      success: true,
      message: 'user deleted',
      payload: {
        user: deleteUser
      }
    })
  } catch (error) {
    console.error('error: ', error)
    response.status = 400
    response.json({
      success: false,
      message: 'user not deleted',
      error: error.message
    })
  }
})

router.put('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const newUserData = request.body
    const updatedUser = await user.updateById(id, newUserData)
    response.json({
      success: true,
      message: 'user updated',
      payload: {
        user: updatedUser
      }
    })
  } catch (error) {
    console.error('error: ', error)
    response.status = 400
    response.json({
      success: false,
      message: 'user not updated',
      error: error.message
    })
  }
})

router.post('/auth', auth, async (request, response) => {
  try {
    const {
      password,
      email
    } = request.body
    const token = await user.logIn(email, password)
    response.json({
      success: true,
      message: 'user log',
      payload: {
        token
      }
    })
  } catch (error) {
    console.error('error: ', error)
    response.status = 401
    response.json({
      success: false,
      message: 'Wrong user credential',
      error: error.message
    })
  }
})

module.exports = router
