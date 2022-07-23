const Blog = ({ blog, handleLikes, handleRemove }) => {

  return (
    <div className='blog'>
      <h4> {blog.title} by {blog.author} </h4>
      <a href={blog.url}>{blog.url}</a>
      <p> {blog.likes} people have liked this blog</p>
      <button className='like-button' type="button" onClick={() => handleLikes(blog)}>like</button>
      <button className='remove-button' type="button" onClick={() => handleRemove(blog.id)}>remove</button>
    </div>
  )
}

const Blogs = ({ blogs, handleLikes, handleRemove }) => (
  <div>
    {blogs.map(b => 
        <Blog 
          key={b.url} 
          blog={b} 
          handleLikes={handleLikes} 
          handleRemove={handleRemove}
        /> 
    )}
  </div>
)

export default Blogs