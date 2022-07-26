const mongoose = require('mongoose')
const supertest = require('supertest')
const blogHelper = require('./blog_test_helper')
const userHelper = require('./user_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const connectBlogsAndUsers = async () => {
  const user = await userHelper.singleUserInDb()
  const blogs = await blogHelper.blogsInDb()

  user.blogs = blogs.map(b => b._id)
  user.save()
  await Blog.updateMany({}, { $set: { user: user._id } })
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(blogHelper.initialBlogs)
  await User.insertMany(userHelper.initialUsers)
  await connectBlogsAndUsers()
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length)
  })

  test('blogs can be identified by id', async () => {
    const blogs = await blogHelper.blogsInDb()
    blogs.forEach(b => expect(b.id).toBeDefined())
  })
})

describe('addition of a new blog', () => {

  test('a valid specific blog can be added', async () => {
    const blogsAtStart = await blogHelper.blogsInDb()

    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${ await userHelper.getToken() }`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContainEqual(
      'First class tests'
    )
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
      .expect(401)
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
      .set('Authorization', `bearer ${ await userHelper.getToken() }`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    console.log( await userHelper.getToken() )

    const blogsAtEnd = await blogHelper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })
})

describe('a blogs information can be updated', () => {

  test('a blogs likes can be updated', async () => {
    const blogsAtStart = await blogHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtTheEnd = await blogHelper.blogsInDb()

    expect(blogsAtTheEnd).toContainEqual(blogToUpdate)
  })
})


describe('deletion of a blog', () => {

  /*
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    console.log('ennen testejä blogin ja käyttäjät poistettu')

    const passWordHash = await bcrypt.hash('salasana123', 10)
    const user = new User({ username: 'hakkinl', passWordHash })

    console.log('käyttäjä', user)

    await user.save()

    console.log('käyttäjä tallennettu')

    await api
      .post('/api/login')
      .send({ username: 'hakkinl', password: 'salasana123' })
      .then((res) => {
        return (token = res.body.token)
      })

    console.log('käyttäjä kirjautunut')

    console.log(token)

    const newBlog = {
      title: 'Kivoi kissoi',
      author: 'Laura Häkkinen',
      url: 'http://kivoikissoi.org'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    return token
  })*/

  test('a blog can be removed with statuscode 204', async () => {

    const blogsAtStart = await blogHelper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${ await userHelper.getToken() }`)
      .expect(204)

    const blogsAtTheEnd = await blogHelper.blogsInDb()

    expect(blogsAtTheEnd).toHaveLength(blogsAtStart.length - 1)
    const titles = blogsAtTheEnd.map(b => b.title)
    expect(titles).not.toContainEqual(blogToDelete.title)
  })

  test('fails when user is not authorized', async () => {
    const blogsAtStart = await blogHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${ null }`)
      .expect(401)

    const blogsAtTheEnd = await blogHelper.blogsInDb()

    expect(blogsAtTheEnd).toHaveLength(blogsAtStart.length)
    const titles = blogsAtTheEnd.map(b => b.title)
    expect(titles).toContainEqual(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

