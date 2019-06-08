const jwt = require('jsonwebtoken')

const { model: User } = require('../models/user')
const bcrypt = require('../lib/bcrypt')

const signUp = async (userData = {}) => {
  const {
    email,
    name,
    lastName,
    age,
    password,
    type,
    address,
    phone
  } = userData

  const hash = await bcrypt.hash(password)

  const user = new User({
    email,
    name,
    lastName,
    age,
    password: hash,
    type,
    address,
    phone
  })
  const error = user.validateSync()
  if (error) throw error

  return user.save()
}

const getAll = async () => {
  const allUser = await User.find().lean()
  const cleanUsers = allUser.map((user) => {
    const { password, ...cleanUser } = user
    return cleanUser
  })
  return cleanUsers
}

const getById = async (userId) => {
  const user = await User.findById(userId).lean()
  const { password, ...cleanUser } = user
  return cleanUser
}

const deleteById = (userId) => User.findByIdAndDelete(userId)

const updateById = (userId, userData) => User.findByIdAndUpdate(userId, userData)

const logIn = async (email, password) => {
  const user = await User.findOne({ email }).lean()
  if (!user) throw new Error(`Invalid credentials`)

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) throw new Error(`Invalid credentials`)

  return jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' })
}

const verifyJwt = token => jwt.verify(token, 'secret')

module.exports = {
  signUp,
  getAll,
  getById,
  deleteById,
  updateById,
  logIn,
  verifyJwt
}
