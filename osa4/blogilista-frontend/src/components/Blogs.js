const Blog = ({ blog, handleLikes }) => {

  return (
    <div className='blog'>
      <h4> {blog.title} by {blog.author} </h4>
      <a href={blog.url}>{blog.url}</a>
      <p> {blog.likes} people have liked this blog</p>
      <button className='like-button' type="button" onClick={() => handleLikes(blog)}>like</button>
    </div>
  )
}

const Blogs = ({ blogs, handleLikes }) => (
  <div>
    {blogs.map(b => 
        <Blog 
          key={b.url} 
          blog={b} 
          handleLikes={handleLikes} 
        /> 
    )}
  </div>
)

export default Blogs