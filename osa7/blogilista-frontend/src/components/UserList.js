import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  const style = {
    fontFamily: 'Arial, Helvetica, sans-serif',
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th style={style}>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.name}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList
