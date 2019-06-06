const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    minLength: 6,
    maxLength: 100,
    unique: true
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true
  },
  age: {
    type: Number,
    min: 18,
    required: true
  },
  password: {
    type: String,
    requiered: true,
    minLength: '1',
    maxLength: '200'
  },
  type: {
    type: String,
    default: 'adopter',
    enum: [
      'admin',
      'adopter'
    ]
  },
  address: {
    type: String,
    requiered: true,
    maxLength: 200
  },
  phone: {
    type: String,
    requiered: true,
    minLength: 8,
    maxLength: 15,
    patter: /^[0-9]{8,15}$/
  }
})

module.exports = {
  schema: userSchema,
  model: model('Users', userSchema)
}
