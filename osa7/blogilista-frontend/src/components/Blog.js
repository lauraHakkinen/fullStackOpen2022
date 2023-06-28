import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {

  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

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
      <h3> {blog.title} by {blog.author} </h3>
      <div className='blogInfo'>
        <a href={blog.url}>{blog.url}</a>
        <p> {blog.likes} people have liked this blog</p>
        <p> added by {blog.user.name} </p>
        <button id='like-button' className='like-button' type="button" onClick={() => handleLike(blog)}>like</button>
        <button id='remove-button' className='remove-button' type="button" onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )

}

export default Blog