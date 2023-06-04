import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleRemove }) => {

  const [buttonState, setButtonState] = useState(false)

  const handleClick = (previousState) => {
    setButtonState(!previousState)
  }

  /*
  const checkOwner = (blog, user) => {
    if (user.username === null) {
      return false
    }
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }*/

  return (
    <div className='blog'>
      <h4>
        {blog.title} by {blog.author}
        <button className='remove-button' type='button' onClick={() => handleClick(buttonState)}>
          {buttonState ? 'hide' : 'view'}
        </button>
      </h4>
      {buttonState
        ? <>
          <a href={blog.url}>{blog.url}</a>
          <p> {blog.likes} people have liked this blog</p>
          <p> {blog.user.username} </p>
          <button className='like-button' type="button" onClick={() => handleLikes(blog)}>like</button>
          <button className='remove-button' type="button" onClick={() => handleRemove(blog.id)}>remove</button>
        </>
        : <></> }
    </div>
  )

}

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