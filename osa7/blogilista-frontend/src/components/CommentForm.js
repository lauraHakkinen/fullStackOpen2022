import React, { useState } from 'react'

const CommentForm = ({ handleNewComment }) => {
  const [comment, setComment] = useState('')

  const handleComment = event => {
    setComment(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    handleNewComment({ comment })
    setComment('')
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          Comment:{' '}
          <input
            id="comment"
            value={comment}
            onChange={handleComment}
            placeholder="add comment"
          />
        </div>
        <div>
          <button id="submit-button" className="submit-button" type="Submit">
            submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
