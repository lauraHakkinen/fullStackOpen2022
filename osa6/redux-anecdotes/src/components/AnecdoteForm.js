import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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