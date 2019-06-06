const { model: User } = require('../models/user')

const signUp = (userData = {}) => {
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

  const user = new User({
    email,
    name,
    lastName,
    age,
    password,
    type,
    address,
    phone
  })
  const error = user.validateSync()
  if (error) throw error

  return user.save()
}

module.exports = {
  signUp
}
