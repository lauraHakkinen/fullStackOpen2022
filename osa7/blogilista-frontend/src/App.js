import { useEffect } from 'react'
import './index.css'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logoutUser } from './reducers/loginReducer'
import User from './components/User'
import Blog from './components/Blog'
import Comments from './components/Comments'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
  })

  const users = useSelector(state => {
    return state.users
  })

  const blogs = useSelector(state => {
    return state.blogs
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user === null ? (
          <></>
        ) : (
          <p style={{ display: 'inline' }}>{user.name} logged in</p>
        )}
        <br />
        <h1>Bloglist</h1>

        <Notification />

        {user === null ? (
          <Togglable buttonLabel="log in">
            <LoginForm />
          </Togglable>
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <button
              className="remove-button"
              type="button"
              onClick={handleLogOut}
            >
              Log out
            </button>
            <BlogForm />
          </div>
        )}
        <br />
        <Routes>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id/comments" element={<Comments />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
