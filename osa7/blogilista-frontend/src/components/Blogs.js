import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = ({ blogs, handleLikes, handleRemove, user }) => {

  blogs = blogs.sort((a,b) => b.likes - a.likes)

  Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.shape({
      token: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string,
    })
  }

  return (
    <div>
      {blogs.map(b =>
        <div key={b.url}>
          <Blog
            key={b.url}
            blog={b}
            handleLikes={handleLikes}
            handleRemove={handleRemove}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default Blogs