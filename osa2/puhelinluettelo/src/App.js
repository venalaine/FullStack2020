import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {

    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const replaceConfirm = window.confirm(`${newName} is already added to phonebook. Do you want to replace old number?`);

      if (replaceConfirm) {
        const personTochange = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

        const newObject = {
          name: personTochange.name,
          number: newNumber,
          id: personTochange.id
        }

        personService
          .updatePerson(personTochange.id, newObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== personTochange.id ? person : response.data))
          })
      }
      setNewName('')
      setNewNumber('')
      
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

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
        <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} />
      </div>
    </div>
  )

}

export default App