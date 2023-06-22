import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'
import notificationReducer, { notificationObject } from './reducers/notificationReducer'

const App = () => {

  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    }
  )

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  if ( result.isLoading ) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch(notificationObject('NOTIFICATION', `You voted for "${anecdote.content}".`))
    setTimeout(() => { 
      notificationDispatch(notificationObject('CLEAR', ''))
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
