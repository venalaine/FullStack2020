import React from 'react'
import personService from '../services/personService'

const Button = ({ personid, personname, persons, setPersons, setErrorMessage }) => {

    const handleClick = () => {
        const deleteConfirm = window.confirm(`Do you want to delete ${personname}?`)
        if (deleteConfirm === true) {
            personService.deletePerson(personid)
                .then(
                    setPersons(persons.filter(person => person.id !== personid))
                )
            setErrorMessage(`Deleted ${personname} from Phonebook`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);

        }
    }

    return (
        <button onClick={handleClick}>Delete</button>
    )
}

export default Button