const Blog = ({ blog, handleLikes }) => {

  return (
    <>
      <h4> {blog.title} by {blog.author} </h4>
      <a href={blog.url}>{blog.url}</a>
      <p> {blog.likes} people have liked this blog</p>
      <button type="button" onClick={() => handleLikes(blog.id)}>like</button>
    </>
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