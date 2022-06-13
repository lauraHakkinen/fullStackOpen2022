import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    // ei voi lisätä pienellä kirjoitettunakaan (esim. nimeä arto hellas ei hyväksytä, 
    // sillä nimi on jo olemassa muodossa Arto Hellas)
    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (existing !== undefined) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(newPersonObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleFilter = (event) => {
    event.preventDefault()

    // apufunktio rajausta varten
    const filtered = (name, num) => {
      // case-insensitiivinen
      const filteredName = name.toLowerCase().includes(newFilter.toLowerCase())
      const filteredNumber = num.toLowerCase().includes(newFilter.toLowerCase())

      return (filteredName || filteredNumber)
    }

    setPersons(persons.filter(p => filtered(p.name, p.number)))
    setNewFilter('')
  }

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleNewFilter = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        handleFilter={handleFilter} 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter} 
      />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNewName={handleNewName} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} 
      />
      
      <h3>Numbers</h3>

      <Persons persons={persons} />
    </div>
  )

}

export default App