const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://ale:M123@cluster0-snmpm.mongodb.net/pets?retryWrites=true&w=majority'

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(connectionString, { userNewUrlParser: true }, (error) => {
    if (error) return reject(error)
    resolve()
  })
})

module.exports = { connect }
