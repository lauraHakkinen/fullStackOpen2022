import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const importedBlogs = useSelector(state => {
    return state.blogs
  })

  const blogs = [...importedBlogs]

  return (
    <div>
      <h2>Blogs</h2>
      <table>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Blogs
