const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exe}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {props.exe1 + props.exe2 + props.exe3}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exe={exercises1} />
      <Content part={part2} exe={exercises2} />
      <Content part={part3} exe={exercises3} />
      <Total exe1={exercises1} exe2={exercises2} exe3={exercises3} />
    </div>
  )
}

export default App
