import { useSelector } from 'react-redux'

//import User from './User'
import UserList from './UserList'

const Users = () => {
  const users = useSelector(state => {
    return state.users
  })

  return (
    <div>
      <h2>Users</h2>
      <UserList users={users} />
    </div>
  )
}

export default Users
