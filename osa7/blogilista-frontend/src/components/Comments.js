import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Comments = () => {
  const { id } = useParams()
  console.log(id)
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const blog = blogs.find(blog => blog.id === id)
  console.log(blog)
  //console.log(blog.comments)

  //if (!blog.comments)
  return null

  /*return (
    <div>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )*/
}

export default Comments
