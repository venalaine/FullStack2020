import React from 'react'
import Button from './Button'

const Persons = ({ personsToShow, persons, setPersons }) => {

  return (
    <div>
      {personsToShow.map((person, name) =>
        <p key={name} >{person.name} {person.number}
          <Button personid={person.id} personname={person.name} persons={persons} setPersons={setPersons}>Delete</Button>
        </p>
      )}
    </div>
  )
}

export default Persons