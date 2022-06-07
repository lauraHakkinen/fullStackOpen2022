import { useState } from 'react'

const Header = (props) => ( <h1> {props.text} </h1> ) 

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes = (props) => ( <p> has {props.votes} votes </p> )

const Anecdote = (props) => ( <p> {props.anecdote} </p> )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    const sel = Math.floor(Math.random() * anecdotes.length)
    setSelected(sel)
  }

  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotesIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={votes[selected]} /> 
      <Button handleClick={handleClickVote} text="vote" />
      <Button handleClick={handleClickNext} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[maxVotesIndex]} />
      <Votes votes={votes[maxVotesIndex]} />
    </div>
  )
}

export default App
