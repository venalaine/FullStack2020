const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
    required: true, //tämä on itse lisätty
    min: 4 // tämä on itse lisätty
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    {
      type: String,
      required: true // tämä on itse lisätty
    },
  ]
})

module.exports = mongoose.model('Book', schema)