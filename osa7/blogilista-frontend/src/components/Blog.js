import { useState } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const [buttonState, setButtonState] = useState(false)

  const handleClick = (previousState) => {
    setButtonState(!previousState)
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(showNotification(`You liked blog "${blog.title}".`, 5))
  }

  const handleRemove = (blog) => {
    dispatch(removeBlog(blog))
    dispatch(showNotification(`Deleted a blog called ${blog.title}`, 5))
  }

  return (
    <div id='blog' className='blog'>
      <h4 className='blogTitleAuthor'>
        {blog.title} by {blog.author}
        <button className='remove-button' type='button' onClick={() => handleClick(buttonState)}>
          {buttonState ? 'hide' : 'view'}
        </button>
      </h4>
      {buttonState
        ? <div className='blogInfo'>
          <a href={blog.url}>{blog.url}</a>
          <p> {blog.likes} people have liked this blog</p>
          <p> {blog.user.username} </p>
          <button id='like-button' className='like-button' type="button" onClick={() => handleLike(blog)}>like</button>
          <button id='remove-button' className='remove-button' type="button" onClick={() => handleRemove(blog)}>remove</button>
        </div>
        : <div className='blogNoInfo'></div> }
    </div>
  )

}

export default Blog