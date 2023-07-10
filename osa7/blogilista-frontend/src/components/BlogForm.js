import { useRef, useState } from 'react'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs
  })

  const user = useSelector(state => {
    return state.user
  })

  const blogFormRef = useRef()

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthor = event => setAuthor(event.target.value)
  const handleTitle = event => setTitle(event.target.value)
  const handleUrl = event => setUrl(event.target.value)

  const createBlogObject = async blogObject => {
    if (!blogObject.author || !blogObject.title || !blogObject.url) {
      dispatch(showNotification('No author, title and/or url specified', 5))
      return
    }

    if (
      blogs.find(
        b =>
          b.author === blogObject.author &&
          b.title === blogObject.title &&
          b.url === blogObject.url
      )
    ) {
      dispatch(
        showNotification('This blog has already been added to the list', 5)
      )
      return
    }

    blogObject.user = user.username
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        showNotification(`Blog ${blogObject.title} was added to the list`, 5)
      )
    } catch (error) {
      dispatch(
        showNotification('An error happened while trying to add blog.', 5)
      )
    }
  }

  const addBlog = event => {
    event.preventDefault()

    createBlogObject({
      author: author,
      title: title,
      url: url,
      likes: 0,
      user: user.username,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel="add a new blog" ref={blogFormRef}>
      <div>
        <h3>Add a new blog</h3>
        <form className="form" onSubmit={addBlog}>
          <div>
            Author:{' '}
            <input
              id="author"
              value={author}
              onChange={handleAuthor}
              placeholder="add author"
            />
          </div>
          <div>
            Title:{' '}
            <input
              id="title"
              value={title}
              onChange={handleTitle}
              placeholder="add title"
            />
          </div>
          <div>
            Url:{' '}
            <input
              id="url"
              value={url}
              onChange={handleUrl}
              placeholder="add url"
            />
          </div>
          <div>
            <button id="submit-button" className="submit-button" type="Submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
