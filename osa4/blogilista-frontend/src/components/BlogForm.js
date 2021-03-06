const BlogForm = ({ addBlog, author, handleAuthor, title, handleTitle, url, handleUrl }) => (

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

)

export default BlogForm