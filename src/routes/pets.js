const express = require('express')

const pet = require('../usecases/pet')

const router = express.Router()

router.use(express.json())

router.post('/', (req, res) => {
  try {
    const newUserData = req.body
    const newUser = pet.signUp(newUserData)
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

router.get('/', async (req, res) => {
  try {
    const allUsers = await pet.getAll()
    res.json({
      success: true,
      message: 'User createds successfully',
      payload: {
        users: allUsers
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

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const foundUser = await pet.getById(id)
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

router.delete('/:id', async (request, response) => {
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

router.put('/:id', async (request, response) => {
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

module.exports = router
