import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
          <BlogForm user={user} username={username} />
        </div>
      }

      <br/>
      <h2>Blogs</h2>

      <Blogs user={user} />
    </div>
  )
}

export default App
