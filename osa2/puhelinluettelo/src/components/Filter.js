import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
    return (
      <form>
        <div>
          Filer by name:
        <input
            value={filter}
            onChange={handleFilterChange}>
          </input>
        </div>
      </form>
    )
  }

export default Filter