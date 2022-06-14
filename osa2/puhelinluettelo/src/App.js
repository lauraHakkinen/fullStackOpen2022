import { useState, useEffect } from 'react'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    // ei voi lisätä pienellä kirjoitettunakaan (esim. nimeä arto hellas ei hyväksytä, 
    // sillä nimi on jo olemassa muodossa Arto Hellas)
    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    switch (true) {
      case existing !== undefined:
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        break
      default:
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
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

  const remove = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
    
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

      <Persons persons={persons} onDelete={remove} />
    </div>
  )

}

export default App