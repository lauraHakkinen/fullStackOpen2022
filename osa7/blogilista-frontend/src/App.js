import { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/loginReducer'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification />

      {user === null
        ? <Togglable buttonLabel='log in'>
          <LoginForm />
        </Togglable>
        : <div>
          <p>{user.name} logged in</p>
          <button className="remove-button" type="button" onClick={handleLogOut}>Log out</button>
          <BlogForm />
        </div>
      }
      <br/>
      <h2>Blogs</h2>
      <Blogs />
    </div>
  )
}

export default App
