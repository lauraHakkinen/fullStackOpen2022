const BlogForm = ({ addBlog, author, handleAuthor, title, handleTitle, url, handleUrl }) => (
  <form onSubmit={addBlog}>
    <div>
      author: <input
        value={author}
        onChange={handleAuthor}
      />
    </div>
    <div>
      title: <input
        value={title}
        onChange={handleTitle}
      />
    </div>
    <div>
      url: <input
        value={url}
        onChange={handleUrl}
      />
    </div>
    <div><button type="Submit">submit</button></div>
  </form>
)

export default BlogForm