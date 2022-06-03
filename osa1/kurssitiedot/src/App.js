const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exe}
      </p>
    </>
  )
}

const Content = ({part1, part2, part3, exe1, exe2, exe3}) => {
  return (
    <>
      <Part part={part1} exe={exe1} />
      <Part part={part2} exe={exe2} />
      <Part part={part3} exe={exe3} />
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exe1={part1.exercises} exe2={part2.exercises} exe3={part3.exercises} />
      <Total exe1={part1.exercises} exe2={part2.exercises} exe3={part3.exercises} />
    </div>
  )
}

export default App
