// KESKENN poista clogit

const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const comments = await Blog.findById(id).populate('comments')
  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body.comment.comment
  console.log(body)
  const { id } = request.params

  const blog = await Blog.findById(id)

  const comment = new Comment({
    comment: body,
  })

  const savedComment = await comment.save()
  console.log(savedComment)
  blog.comments = blog.comments.concat(savedComment._id)
  console.log(blog.comments)
  await blog.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter
