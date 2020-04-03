import React from 'react'

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
    return (
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
    )
  }

export default PersonForm