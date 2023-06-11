import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, user }) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthor = (event) => setAuthor(event.target.value)

  const handleTitle = (event) => setTitle(event.target.value)

  const handleUrl = (event) => setUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      author: author,
      title: title,
      url: url,
      likes: 0,
      user: user.username
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  return (
    <div>
      <h3>Add a new blog</h3>
      <form className='form' onSubmit={addBlog}>
        <div>
          Author: <input
            id="author"
            value={author}
            onChange={handleAuthor}
            placeholder='add author'
          />
        </div>
        <div>
          Title: <input
            id="title"
            value={title}
            onChange={handleTitle}
            placeholder='add title'
          />
        </div>
        <div>
          Url: <input
            id="url"
            value={url}
            onChange={handleUrl}
            placeholder='add url'
          />
        </div>
        <div><button id="submit-button" className='submit-button' type="Submit">submit</button></div>
      </form>
    </div>
  )
}

export default BlogForm