const { model: Pet } = require('../models/pet')

const createPet = (userData = {}) => {
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

const getAll = async () => {
  const allPet = await Pet.find().lean()
  const cleanPets = allPet.map((pet) => {
    const { password, ...cleanPet } = pet
    return cleanPet
  })
  return cleanPets
}

const getById = async (petId) => {
  const pet = await Pet.findById(petId).lean()
  const { password, ...cleanPet } = pet
  return cleanPet
}

const deleteById = (petId) => Pet.findByIdAndDelete(petId)

const updateById = (petId, petData) => Pet.findByIdAndUpdate(petId, petData)

module.exports = {
  createPet,
  getAll,
  getById,
  deleteById,
  updateById
}
