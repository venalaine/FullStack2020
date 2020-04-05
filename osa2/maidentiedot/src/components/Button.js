import React from 'react'

const Button = ({ country, setNewFilter }) => {

    const handleClick = () => {
        setNewFilter(country.name)
    }

    return (
        <button onClick={handleClick} >
            Show info
        </button>
    )
}

export default Button