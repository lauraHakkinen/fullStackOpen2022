import { useState } from 'react'

const Blog = ({ blog }) => {

  const [buttonState, setButtonState] = useState(false)

  const handleClick = (previousState) => {
    setButtonState(!previousState)
  }

  /*
  const checkOwner = (blog, user) => {
    if (user.username === null) {
      return false
    }
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }*/

  return (
    <div id='blog' className='blog'>
      <h4 className='blogTitleAuthor'>
        {blog.title} by {blog.author}
        <button className='remove-button' type='button' onClick={() => handleClick(buttonState)}>
          {buttonState ? 'hide' : 'view'}
        </button>
      </h4>
      {buttonState
        ? <div className='blogInfo'>
          <a href={blog.url}>{blog.url}</a>
          <p> {blog.likes} people have liked this blog</p>
          <p> {blog.user.username} </p>
          <button id='like-button' className='like-button' type="button" onClick={() => console.log(blog)}>like</button>
          <button id='remove-button' className='remove-button' type="button" onClick={() => console.log(blog.id)}>remove</button>
        </div>
        : <div className='blogNoInfo'></div> }
    </div>
  )

}

export default Blog