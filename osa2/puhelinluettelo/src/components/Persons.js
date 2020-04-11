import React from 'react'
import Button from './Button'

const Persons = ({ personsToShow, persons, setPersons, setErrorMessage }) => {

  return (
    <div>
      {personsToShow.map((person, name) =>
        <p key={name} >{person.name} {person.number}
          <Button personid={person.id} personname={person.name} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}>Delete</Button>
        </p>
      )}
    </div>
  )
}

export default Persons