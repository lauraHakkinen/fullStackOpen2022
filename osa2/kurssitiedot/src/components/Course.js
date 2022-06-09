const Header = ({ name }) => ( <h2>{name}</h2> )

const Content = ({ parts }) => (
  <>
    {parts.map(part =>
      <p key={part.id}> {part.name} {part.exercises} </p> 
    )}
  </>
)

const Total = ({ parts }) => (
  <h4>
    total of { parts.reduce( ((sum, part) => sum + part.exercises), 0 ) } exercises
  </h4>
)

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course