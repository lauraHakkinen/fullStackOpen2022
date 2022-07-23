import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({message: null})

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleMessage = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      author: author,
      title: title,
      url: url,
      likes: 0
    }

    if (!author || !title || !url) {
      handleMessage('No author, title and/or url specified', 'error')
      return
    }

    if (blogs.find(b => (b.author === author && b.title === title && b.url === url))) {
      handleMessage('This blog has already been added to the list', 'error')
      return
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
        handleMessage(`Blog ${returnedBlog.title} was added to the list`)
      })
      .catch(error => {
        handleMessage(error.response.data.error, 'error')
      })
  }

  const updateLikes = (blog) => {
    const findBlog = blogs.find(b => b.id === blog.id)
    const updatedBlog = {...findBlog, likes: findBlog.likes + 1}

    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : returnedBlog))
      })
      .catch(error => {
        handleMessage('An error occured while trying to like a blog', 'error')
      })
  }

  const handleRemove = (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(blog.title)

    if (window.confirm(`Delete blog called ${blog.title} ?`)) {
      blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      handleMessage(`Deleted a blog called ${blog.title}`)
    }
  }

  const handleAuthor = (event) => setAuthor(event.target.value)

  const handleTitle = (event) => setTitle(event.target.value)

  const handleUrl = (event) => setUrl(event.target.value)

  return (
    <div>
      <h2>Bloglist</h2>

      <Notification notification={notification} />
      
      <h3>Add a blog</h3>

      <BlogForm 
        addBlog={addBlog}
        author={author}
        handleAuthor={handleAuthor}
        title={title}
        handleTitle={handleTitle}
        url={url}
        handleUrl={handleUrl}
      />

      <h3>Blogs</h3>

      <Blogs blogs={blogs} handleLikes={updateLikes} handleRemove={handleRemove} />
    </div>
  )
}

export default App
