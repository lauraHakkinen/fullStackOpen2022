const Person = ({ person, onDelete }) => (
  <div> 
    {person.name} {person.number} 
    <button onClick={() => onDelete(person.id)} value={person.id}>Delete</button>
  </div>
)

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map(person =>
      <Person key={person.name} person={person} onDelete={onDelete}/>
    )}
  </div>
)

export default Persons