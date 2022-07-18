import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      author: author,
      title: title,
      url: url,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
      })
  }

  const updateLikes = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = {...blog, likes: blog.likes + 1}

    console.log(updatedBlog)
    console.log(id)

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        console.log('blog likes will be updated')
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        console.log('blog likes updated')
      })
      .catch(error => {
        console.log('error while trying to update blog')
      })
  }

  const handleAuthor = (event) => setAuthor(event.target.value)

  const handleTitle = (event) => setTitle(event.target.value)

  const handleUrl = (event) => setUrl(event.target.value)

  return (
    <div>
      <h2>Bloglist</h2>
      
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

      <Blogs blogs={blogs} handleLikes={updateLikes} />
    </div>
  )
}

export default App
