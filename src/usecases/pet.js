const { model: Pet } = require('../models/pet')

const registration = (userData = {}) => {
  const {
    name,
    ageInMonths,
    size,
    species,
    breed,
    description,
    photo,
    isAdopted,
    userId,
    adopterUserId
  } = userData

  const user = new Pet({
    name,
    ageInMonths,
    size,
    species,
    breed,
    description,
    photo,
    isAdopted,
    userId,
    adopterUserId
  })
  const error = user.validateSync()
  if (error) throw error

  return user.save()
}

module.exports = {
  registration
}
