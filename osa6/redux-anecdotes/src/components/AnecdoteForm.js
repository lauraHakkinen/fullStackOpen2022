import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You created a new anecdote: "${content}".`))
    setTimeout(() => { 
      dispatch(setNotification('')) 
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
        <form onSubmit={addNew}>
          <input name='anecdote'/>
          <button type='submit'>create</button>
        </form>
    </>
  )

}

export default NewAnecdote