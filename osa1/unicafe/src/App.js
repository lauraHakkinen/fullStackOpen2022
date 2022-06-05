import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)

const App = () => {
  // tallennetaan napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = (newValue) => setGood(newValue)
  const incrementNeutral = (newValue) => setNeutral(newValue)
  const incrementBad = (newValue) => setBad(newValue)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => incrementGood(good + 1)} text="good" />
      <Button handleClick={() => incrementNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => incrementBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
    </div>
  )
}

export default App
