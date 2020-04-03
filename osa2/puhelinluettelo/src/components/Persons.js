import React from 'react'

const Persons = ({ personsToShow }) => {
    return (
      <div>
        {personsToShow.map((person, name) =>
          <p key={name} >{person.name} {person.number} </p>
        )}
      </div>
    )
  }

export default Persons