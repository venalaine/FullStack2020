import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Testihenkilö Sukunimetön', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)

  }

  const personsToShow = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <h2>Add new person and number</h2>
      <div>
        <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      </div>
      <h2>Numbers</h2>
      <div>
        <Persons personsToShow={personsToShow} />
      </div>
    </div>
  )

}

export default App