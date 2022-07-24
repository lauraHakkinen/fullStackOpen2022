const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'How to be a sigma',
    author: 'Teemu Teekkari',
    url: 'http://sigma.com',
    likes: 10,
    id: '62d42432c08e59f766c70622'
  },
  {
    title: 'Millainen sää huomenna?',
    author: 'Pekka Pouta',
    url: 'http://saa.fi',
    likes: 8,
    id: '62d4270fc08e59f766c70627'
  },
  {
    title: 'Kivoi kissoi',
    author: 'Laura Häkkinen',
    url: 'http://kivoikissoi.org',
    likes: 8,
    id: '62d5a535794fa33bd9b7180e'
  }
]

/*
const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Laura Häkkinen', url: 'http://kivoikissoi.org' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}