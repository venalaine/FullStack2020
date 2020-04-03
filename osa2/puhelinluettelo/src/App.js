import React, { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // Tällä toteutin aiemmin henkilöiden ja numeroiden näyttämisen.
  //  const personsToShow = persons.map((person) =>
  //    <p key={person.name}>
  //      {person.name} {person.number}
  //    </p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:
          <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add new</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*personsToShow*/}
      {persons.map((person, name) =>
        <p key={name} >{person.name} {person.number} </p>
      )}
    </div>
  )

}

export default App