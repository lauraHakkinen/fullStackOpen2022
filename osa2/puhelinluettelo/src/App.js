import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleMessage = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => setNotification({ message: null }), 5000)
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
          .catch(error => {
            console.log(error.response.data)
            handleMessage(JSON.stringify(error.response.data), 'error')
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
          .catch(error => {
            console.log(error.response.data)
            handleMessage(JSON.stringify(error.response.data), 'error')
          })
    }
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

  const handleFilter = (event) => setFilter(event.target.value)

  const filterNameAndNum = (name, num) => {
    const filteredName = name.toLowerCase().includes(filter.toLowerCase())
    const filteredNumber = num.toLowerCase().includes(filter.toLowerCase())

    return (filteredName || filteredNumber)
  }

  const showFiltered = persons.filter(p => filterNameAndNum(p.name, p.number))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
      
      <Filter 
        handleFilter={handleFilter} 
        filter={filter} 
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

      <Persons persons={showFiltered} onDelete={remove} />
    </div>
  )

}

export default App