import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  /*if (!user) {
    return null
  }*/

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.name}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default UserList