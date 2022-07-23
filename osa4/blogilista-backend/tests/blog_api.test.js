const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs can be identified by id', async () => {
  const blogs = await helper.blogsInDb()
  blogs.forEach(b => expect(b.id).toBeDefined())
})

test('a valid specific note can be added', async () => {
  const newBlog = {
    title: 'First class tests',
    id: '62dc429e3797295450e5b96a',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContainEqual(
    'First class tests'
  )
})

test('the default value of likes is zero', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('a blog can only be added if it contains a title and an url', async () => {
  const newBlog = {
    title: '',
    author: '',
    url: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be removed with statuscode 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtTheEnd = await helper.blogsInDb()

  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtTheEnd.map(b => b.title)
  expect(titles).not.toContainEqual(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})