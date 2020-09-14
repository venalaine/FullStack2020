import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>log out</button>
        </div>

        <Authors
          show={page === 'authors'}
          authorsFromDB={authorsResult.data.allAuthors}
        />

        <Books
          show={page === 'books'}
          booksFromDB={booksResult.data.allBooks}
        />

        <NewBook
          show={page === 'add'}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>log in</button>
      </div>

      <Authors
        show={page === 'authors'}
        authorsFromDB={authorsResult.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        booksFromDB={booksResult.data.allBooks}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />
    </div>
  )
}

export default App