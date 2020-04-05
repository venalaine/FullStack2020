import React from 'react'

const SearchForm = ({ filter, handleFilterChange }) => {
    return (
        <div>
            <h1>Country Information Application</h1>
            Find countries:
            <br />
            <input
                value={filter}
                onChange={handleFilterChange}>
            </input>
        </div>
    )
}

export default SearchForm