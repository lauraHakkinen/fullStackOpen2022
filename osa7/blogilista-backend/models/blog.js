const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  author: {
    type: String,
    minlength: 3,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
