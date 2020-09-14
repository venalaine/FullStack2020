import React, { useState } from 'react'

const RenderBooks = ({ filter, books }) => {
  if (filter === null || filter === 'all genres') {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
          </th>
            <th>
              published
          </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  let filteredBooks = books.filter(b => b.genres.includes(filter))

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
      </th>
          <th>
            published
      </th>
        </tr>
        {filteredBooks.map(b =>
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        )}
      </tbody>
    </table >
  )
}

const Books = ({ show, booksFromDB }) => {
  const [filter, setFilter] = useState(null)

  if (!show) {
    return null
  }

  const books = booksFromDB

  let genreSet = new Set()
  books.map(book => book.genres.map(genre => genreSet.add(genre)))
  genreSet.add('all genres')
 

  return (
    <div>
      <h2>books</h2>
      in genre <b>patterns</b>
      <RenderBooks filter={filter} books={books}/>
      {Array.from(genreSet).map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)}
    </div>
  )
}

export default Books