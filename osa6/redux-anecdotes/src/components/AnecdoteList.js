import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {

  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(a => a.content.toUpperCase().includes(state.filter.toUpperCase()))
  })

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(showNotification(`You voted for "${anecdotes.find(a => a.id === id).content}".`, 5))
  }

  return (
    <>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes