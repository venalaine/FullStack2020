import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from "react-select";


const Authors = (props) => {
//  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }
  const authors = props.props

  const options = []
  authors.map(a => options.push({ value: a.name, label: a.name }))
  
  const submit = async (event) => {
    event.preventDefault()

    const name = selectedOption.value
    editAuthor({ variables: { name, born } })

    console.log('add author')

    setSelectedOption(null)
    setBorn('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h2>Set bithyear</h2>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors