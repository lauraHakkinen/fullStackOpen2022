import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  const blogs = useSelector(state => {
    return state.blogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {

    if (!blogObject.author || !blogObject.title || !blogObject.url) {
      dispatch(showNotification('No author, title and/or url specified', 5))
      return
    }

    if (blogs.find(b => (b.author === blogObject.author && b.title === blogObject.title && b.url === blogObject.url))) {
      dispatch(showNotification('This blog has already been added to the list', 5))
      return
    }

    blogObject.user = username
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(showNotification(`Blog ${blogObject.title} was added to the list`, 5))
  }

  /*const updateLikes = (blog) => {
    const findBlog = blogs.find(b => b.id === blog.id)
    const updatedBlog = { ...findBlog, likes: findBlog.likes + 1, user: findBlog.user }

    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : returnedBlog))
      })
      .catch(() => {
        dispatch(showNotification('An error occured while trying to like a blog', 5))
      })
  }*/

  /*const handleRemove = (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog.title)

    if (window.confirm(`Delete blog called ${blog.title} ?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          dispatch(showNotification(`Deleted a blog called ${blog.title}`, 5))
        })
        .catch(() => {
          dispatch(showNotification('An error occured while trying to delete blog', 5))
        })
    }
  }*/

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 5))
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

      <Notification />

      {user === null
        ? <Togglable buttonLabel='log in'>
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

      <br/>
      <h2>Blogs</h2>

      <Blogs user={user} />
    </div>
  )
}

export default App
