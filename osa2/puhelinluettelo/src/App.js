import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
    }

    const existing = persons.find(p => p.name === newName)
    if (existing !== undefined) {
      alert(newName + ' is already added to phonebook')
      setNewName('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
    
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}> {person.name} </p>
        )}
      </div>
    </div>
  )

}

export default App