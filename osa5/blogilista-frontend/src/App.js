import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const addBlog = (blogObject) => {

    if (!blogObject.author || !blogObject.title || !blogObject.url) {
      handleMessage('No author, title and/or url specified', 'error')
      return
    }

    if (blogs.find(b => (b.author === blogObject.author && b.title === blogObject.title && b.url === blogObject.url))) {
      handleMessage('This blog has already been added to the list', 'error')
      return
    }

    blogObject.user = username

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleMessage(`Blog ${returnedBlog.title} was added to the list`)
      })
      .catch(error => {
        handleMessage(error.response.data.error, 'error')
      })
  }

  const updateLikes = (blog) => {
    const findBlog = blogs.find(b => b.id === blog.id)
    const updatedBlog = { ...findBlog, likes: findBlog.likes + 1, user: findBlog.user }

    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : returnedBlog))
      })
      .catch(() => {
        handleMessage('An error occured while trying to like a blog', 'error')
      })
  }

  const handleRemove = (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog.title)

    if (window.confirm(`Delete blog called ${blog.title} ?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          handleMessage(`Deleted a blog called ${blog.title}`)
        })
        .catch(() => {
          handleMessage('An error occured while trying to delete blog', 'error')
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleMessage('Wrong username or password', 'error')
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload(false)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification notification={notification} />

      {user === null
        ? <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
        : <div>
          <p>{user.name} logged in</p>
          <button className="remove-button" type="button" onClick={handleLogOut}>Log out</button>
          <Togglable buttonLabel='add a new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
        </div>
      }

      <h3>Blogs</h3>

      <Blogs blogs={blogs} handleLikes={updateLikes} handleRemove={handleRemove} user={user} />
    </div>
  )
}

export default App
