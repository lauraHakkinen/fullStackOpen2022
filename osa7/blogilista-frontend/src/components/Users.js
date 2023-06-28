import { useSelector } from 'react-redux'

import User from './User'

const Users = () => {
  const users = useSelector(state => {
    return state.users
  })

  return (
    <div>
      <h2>Users</h2>
      <User users={users} />
    </div>
  )
}

export default Users