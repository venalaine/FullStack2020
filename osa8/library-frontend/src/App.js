import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name} is now added`)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

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
          <button onClick={() => setPage('recommended')}>recommended</button>
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

        <Recommendations 
          show={page === 'recommended'}
          booksFromDB={booksResult.data.allBooks}
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