const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  bookCount: {
    type: Number,
  },
})

schema.pre('validate', function (next) {
  this.bookCount = this.books.length
  next()
})

module.exports = mongoose.model('Author', schema)
