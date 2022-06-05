import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) => <div>{props.text} {props.value}</div>

const Statistics = (props) => {
  const good = props.list[0]
  const neutral = props.list[1]
  const bad = props.list[2]

  if (good === 0 && neutral === 0 && bad === 0) {
    return <div><p>No feedback given</p></div>
  }

  const all = good + neutral + bad
  let avg = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  let pos = 100 * (good / all)

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={avg} />
      <div>positive {pos} %</div>
    </div>
  )
}

const App = () => {
  // tallennetaan napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const list = [good, neutral, bad]

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics list={list} />
    </div>
  )
}

export default App
