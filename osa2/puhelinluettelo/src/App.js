import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  function handleMessage(message) {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

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
        alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
        const updatedPerson = { ...existing, number: newNumber}
        personService
          .update(existing.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            handleMessage(`The phonenumber of ${existing.name} was changed`)
          })
        break
      default:
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            handleMessage(`Added ${newName}`)
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
      handleMessage(`Deleted ${person.name}`)
    }
    
  }

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleNewFilter = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      
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