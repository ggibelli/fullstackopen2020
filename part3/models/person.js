const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator')

require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  number: { type: String,
    minlength: 8,
    required: true
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)