import PropTypes from 'prop-types'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ user }) => {

  //const dispatch = useDispatch()

  const importedBlogs = useSelector(state => {
    return state.blogs
  })

  const blogs = [...importedBlogs]

  Blogs.propTypes = {
    user: PropTypes.shape({
      token: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string,
    })
  }

  return (
    <div>
      {blogs.sort((a,b) => b.likes - a.likes).map(b =>
        <div key={b.url}>
          <Blog
            key={b.url}
            blog={b}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default Blogs