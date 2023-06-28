import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router, Link
} from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Menu = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
  })

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <div>
            <em>{user.name} logged</em>
            <button className="remove-button" type="button" onClick={handleLogOut}>Log out</button>
          </div>
          : null
        }
      </div>
    </Router>
  )
}

export default Menu