import { useState } from 'react'

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

  return (
    <div>
      <h3>Add a blog</h3>
      <form className='form' onSubmit={addBlog}>
        <div>
          Author: <input
            value={author}
            onChange={handleAuthor}
          />
        </div>
        <div>
          Title: <input
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          Url: <input
            value={url}
            onChange={handleUrl}
          />
        </div>
        <div><button className='submit-button' type="Submit">submit</button></div>
      </form>
    </div>
  )
}

export default BlogForm