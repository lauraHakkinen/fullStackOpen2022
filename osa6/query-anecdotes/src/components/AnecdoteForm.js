import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'
import { notificationObject } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    if (content.length < 6) {
      dispatch(notificationObject('NOTIFICATION', 'too short anecdote, must have length 5 or more'))
    } else {
      dispatch(notificationObject('NOTIFICATION', `You created a new anecdote: "${content}".`)) 
    }
    setTimeout(() => { 
      dispatch(notificationObject('CLEAR', ''))
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
